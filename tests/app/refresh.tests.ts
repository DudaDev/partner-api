import nock from "nock";
import * as sinon from "sinon";
import { expect } from "chai";

import { Duda } from "../../src/index";

describe("App store refresh tests", () => {
  /* Thu Apr 18 2019 01:23:36 GMT+0000 */
  const pastTimestamp = 1555550616864;

  /* Fri Aug 20 2077 21:37:30 GMT+0000 */
  const futureTimestamp = 3396721050000;

  const refreshToken = "YYY-YYYYY-YYYYY";
  const auth = {
    type: "bearer" as const,
    authorization_code: "XXX-XXXXX-XXXXX",
    refresh_token: refreshToken,
    expiration_date: pastTimestamp,
  };

  const basePath = "/api/integrationhub/application";
  const appUuid = "uuid";
  const siteName = "abc123";

  let duda: Duda;
  let scope: nock.Scope;

  beforeEach(() => {
    scope = nock(`https://${Duda.Envs.direct}`);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("with an expired authentication token", () => {
    beforeEach(() => {
      duda = new Duda(
        {
          user: "testing",
          pass: "testing",
          env: Duda.Envs.direct,
        },
        {
          auth,
          uuid: appUuid,
        },
      );
    });

    it("will refresh the auth", async () => {
      scope.post(`${basePath}/site/${siteName}/republish`).reply(204);
      scope
        .post(`${basePath}/${appUuid}/token/refresh`, (body) => {
          expect(body).to.eql({ refresh_token: refreshToken });
          return body;
        })
        .reply(200, { ...auth, expiration_date: futureTimestamp });

      await duda.appstore.sites.republish({ site_name: siteName });
      // ensure all intercepters were called, including refresh
      return expect(nock.isDone()).to.be.true;
    });

    it("calls the refresh endpoint before making the API request", async () => {
      const callOrder: string[] = [];

      scope
        .post(`${basePath}/${appUuid}/token/refresh`)
        .reply(200, function () {
          callOrder.push("refresh");
          return { ...auth, expiration_date: futureTimestamp };
        });

      scope
        .post(`${basePath}/site/${siteName}/republish`)
        .reply(204, function () {
          callOrder.push("republish");
        });

      await duda.appstore.sites.republish({ site_name: siteName });

      expect(callOrder).to.eql(["refresh", "republish"]);
    });

    it("will emit the new auth object with updated properties", async () => {
      scope.post(`${basePath}/site/${siteName}/republish`).reply(204);
      scope
        .post(`${basePath}/${appUuid}/token/refresh`, (body) => {
          expect(body).to.eql({ refresh_token: refreshToken });
          return body;
        })
        .reply(200, { ...auth, expiration_date: futureTimestamp });

      const spy = sinon.spy();
      duda.events.on("refresh", spy);

      await duda.appstore.sites.republish({ site_name: siteName });

      expect(spy.calledWith({ ...auth, expiration_date: futureTimestamp })).to
        .be.true;
      duda.events.off("refresh", spy);
    });

    it("will save the refreshed auth object to its config", async () => {
      scope.post(`${basePath}/site/${siteName}/republish`).reply(204);
      scope
        .post(`${basePath}/${appUuid}/token/refresh`, (body) => {
          expect(body).to.eql({ refresh_token: refreshToken });
          return body;
        })
        .reply(200, { ...auth, expiration_date: futureTimestamp });

      await duda.appstore.sites.republish({ site_name: siteName });
      expect(duda.appstore.auth?.expiration_date).to.eql(futureTimestamp);
    });
  });

  describe("with an almost expired authentication token", () => {
    beforeEach(() => {
      scope.post(`${basePath}/site/${siteName}/republish`).reply(204);
      duda = new Duda(
        {
          user: "testing",
          pass: "testing",
          env: Duda.Envs.direct,
        },
        {
          auth: { ...auth, expiration_date: Date.now() + 1000 },
          uuid: appUuid,
        },
      );
    });

    it("will preemptively refresh the auth", async () => {
      scope
        .post(`${basePath}/${appUuid}/token/refresh`)
        .reply(200, { ...auth, expiration_date: futureTimestamp });

      await duda.appstore.sites.republish({ site_name: siteName });

      // ensure all intercepters were called, including refresh
      expect(nock.isDone()).to.be.true;
    });
  });

  describe("with an unexpired authentication token", () => {
    beforeEach(() => {
      scope.post(`${basePath}/site/${siteName}/republish`).reply(204);

      duda = new Duda(
        {
          user: "testing",
          pass: "testing",
          env: Duda.Envs.direct,
        },
        {
          auth: { ...auth, expiration_date: futureTimestamp },
          uuid: appUuid,
        },
      );
    });

    it("does not refresh the auth", async () => {
      scope.post(`${basePath}/${appUuid}/token/refresh`).reply(200);

      await duda.appstore.sites.republish({ site_name: siteName });
      expect(nock.pendingMocks()[0]).to.contain("uuid/token/refresh");
    });
  });
});
