import nock from 'nock';
import { expect } from 'chai';
import { Duda } from '../../src/index';

describe('App store token tests', () => {
  const base_path = '/api/integrationhub/application';
  const user = 'testuser';
  const pass = 'testpass';
  const encoded_auth = Buffer.from(`${user}:${pass}`).toString('base64');
  const app_uuid = 'uuid';
  const refresh_token = '123456';

  const response = {
    type: 'bearer',
    authorization_code: 'XXX-XXXXX-XXXXX',
    refresh_token: 'YYY-YYYYY-YYYYY',
    expiration_date: 1555550616864,
  };

  let duda: Duda;
  let scope: nock.Scope;

  before(() => {
    duda = new Duda({
      user,
      pass,
      env: Duda.Envs.direct,
    });

    scope = nock(`https://${Duda.Envs.direct}`, {
      reqheaders: {
        authorization: `Basic ${encoded_auth}`,
      },
    });
  });

  it('can create a new access token', async () => {
    scope.post(`${base_path}/${app_uuid}/token/refresh`, (body) => {
      expect(body).to.eql({ refresh_token });
      return body;
    }).reply(200, response);

    return await duda.appstore.tokens.create({ app_uuid, refresh_token });
  });

  it('can use refresh to create a new access token', async () => {
    scope.post(`${base_path}/${app_uuid}/token/refresh`, (body) => {
      expect(body).to.eql({ refresh_token });
      return body;
    }).reply(200, response);

    return await duda.appstore.tokens.refresh({ app_uuid, refresh_token });
  });
});
