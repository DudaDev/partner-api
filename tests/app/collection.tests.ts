import { expect } from "chai";
import nock from "nock";
import { Duda } from "../../src/index";

describe("App store collection tests", () => {
  let duda: Duda;
  let scope: nock.Scope;

  const base_path = "/api/integrationhub/application";

  const collection_info = {
    name: "test_collection",
    fields: [
      {
        name: "email",
        type: "email",
      },
    ],
  };
  const collection_output = {
    name: "test_collection",
    item_count: 10,
    customer_lock: "unlocked",
    fields: [
      {
        name: "email",
        type: "email",
      },
    ],
    values: [
      {
        id: "1",
        data: {
          info: "test",
        },
      },
    ],
  };
  const external_details = {
    enabled: true,
    external_id: "1",
    external_endpoint: "2",
    page_item_url_field: "3",
    collection_data_json_path: "4",
    authorization_header_value: "5",
  };
  const collection_name = "new_collection_name";
  const update_collection_payload = {
    name: collection_name,
    customer_lock: "unlocked",
    external_details,
  };

  const row_data = [
    {
      data: {
        info: "test",
      },
    },
  ];
  const row_output = [{ id: "1" }];
  const row_update = [
    {
      id: "1",
      data: {
        info: "test",
      },
    },
  ];

  const row_delete = ["123", "456"];

  const field = [
    {
      name: "email",
      type: "email",
    },
  ];

  const user = "testuser";
  const pass = "testpass";
  const token = "123456";

  before(() => {
    duda = new Duda({
      user,
      pass,
      env: Duda.Envs.direct,
    });

    scope = nock("https://api.duda.co", {
      reqheaders: {
        "x-duda-access-token": `Bearer ${token}`,
      },
    });
  });

  it("can create a collection", async () => {
    scope
      .post(`${base_path}/site/test_site/collection`, (body) => {
        expect(body).to.eql(collection_info);
        return body;
      })
      .reply(204);

    return await duda.appstore.collections.create({
      site_name: "test_site",
      name: "test_collection",
      fields: [
        {
          name: "email",
          type: "email",
        },
      ],
      token,
    });
  });

  it("can list all collections", async () => {
    scope
      .get(`${base_path}/site/test_site/collections`)
      .reply(200, collection_output);
    return await duda.appstore.collections.list({
      site_name: "test_site",
      token,
    });
  });

  it("can get a specific collection", async () => {
    scope
      .get(`${base_path}/site/test_site/collection/test_collection`)
      .reply(200, collection_output);
    return await duda.appstore.collections.get({
      site_name: "test_site",
      collection_name: "test_collection",
      token,
    });
  });

  it("can successfully update a specific collection", async () => {
    scope
      .put(`${base_path}/site/test_site/collection/test_collection`, (body) => {
        expect(body).to.eql(update_collection_payload);
        return body;
      })
      .reply(204);
    return await duda.appstore.collections.update({
      name: collection_name,
      site_name: "test_site",
      current_collection_name: "test_collection",
      customer_lock: "unlocked",
      external_details: { ...external_details },
      token,
    });
  });

  it("can clear cache for a specific collection", async () => {
    scope
      .post(`${base_path}/site/test_site/collection/test_collection/revalidate`)
      .reply(200);
    return await duda.appstore.collections.clearCache({
      site_name: "test_site",
      collection_name: "test_collection",
      token,
    });
  });

  it("can clear cache for specific collections by external_id", async () => {
    scope.post(`${base_path}/site/collections/revalidate/test_id`).reply(200);
    return await duda.appstore.collections.clearCacheByExtID({
      external_id: "test_id",
      token,
    });
  });

  it("can delete a collection", async () => {
    scope
      .delete(`${base_path}/site/test_site/collection/test_collection`)
      .reply(204);
    return await duda.appstore.collections.delete({
      site_name: "test_site",
      collection_name: "test_collection",
      token,
    });
  });

  describe("rows", () => {
    it("can add a row to a collection", async () => {
      scope
        .post(
          `${base_path}/site/test_site/collection/test_collection/row`,
          (body) => {
            expect(body).to.eql(row_data);
            return body;
          },
        )
        .reply(200, row_output);

      return await duda.appstore.collections.rows.create({
        site_name: "test_site",
        collection_name: "test_collection",
        raw_body: row_data,
        token,
      });
    });

    it("can update a row in a collection", async () => {
      scope
        .put(
          `${base_path}/site/test_site/collection/test_collection/row`,
          (body) => {
            expect(body).to.eql(row_update);
            return body;
          },
        )
        .reply(204);

      return await duda.appstore.collections.rows.update({
        site_name: "test_site",
        collection_name: "test_collection",
        raw_body: row_update,
        token,
      });
    });

    it("can delete a single row from a collection", async () => {
      scope
        .delete(
          `${base_path}/site/test_site/collection/test_collection/row/test_row`,
        )
        .reply(204);
      return await duda.appstore.collections.rows.deleteRow({
        site_name: "test_site",
        collection_name: "test_collection",
        row_id: "test_row",
        token,
      });
    });

    it("can delete multiple rows from a collection", async () => {
      scope
        .delete(
          `${base_path}/site/test_site/collection/test_collection/row`,
          (body) => {
            expect(body).to.eql(row_delete);
            return body;
          },
        )
        .reply(204);

      return await duda.appstore.collections.rows.delete({
        site_name: "test_site",
        collection_name: "test_collection",
        raw_body: row_delete,
        token,
      });
    });
  });

  describe("fields", () => {
    it("can add a field to a collection", async () => {
      scope
        .post(
          `${base_path}/site/test_site/collection/test_collection/field`,
          (body) => {
            expect(body).to.eql(field);
            return body;
          },
        )
        .reply(204);

      return await duda.appstore.collections.fields.create({
        site_name: "test_site",
        collection_name: "test_collection",
        raw_body: field,
        token,
      });
    });

    it("can update a field in a collection", async () => {
      scope
        .put(
          `${base_path}/site/test_site/collection/test_collection/field/test_field`,
          (body) => {
            expect(body).to.eql({ name: "new_name" });
            return body;
          },
        )
        .reply(204);

      return await duda.appstore.collections.fields.update({
        site_name: "test_site",
        collection_name: "test_collection",
        field_name: "test_field",
        name: "new_name",
        token,
      });
    });

    it("can delete a field in a collection", async () => {
      scope
        .delete(
          `${base_path}/site/test_site/collection/test_collection/field/test_field`,
        )
        .reply(204);
      return await duda.appstore.collections.fields.delete({
        site_name: "test_site",
        collection_name: "test_collection",
        field_name: "test_field",
        token,
      });
    });
  });
});
