import * as Types from "./types";
import { TokenRequest } from "../types";
import { SubResource } from "../../base";

import { APIEndpoint } from "../../APIEndpoint";

class AppRows extends SubResource {
  create = APIEndpoint<TokenRequest<Types.AddRowPayload>, Types.AddRowResponse>(
    {
      method: "post",
      path: "/site/{site_name}/collection/{collection_name}/row",
      defaults: {
        host: "api.duda.co",
      },
      headerOptions: {
        "X-DUDA-ACCESS-TOKEN": {
          required: true,
        },
      },
      beforeRequest(opts) {
        return opts.raw_body;
      },
    },
  );

  update = APIEndpoint<
    TokenRequest<Types.UpdateRowPayload>,
    Types.UpdateRowResponse
  >({
    method: "put",
    path: "/site/{site_name}/collection/{collection_name}/row",
    defaults: {
      host: "api.duda.co",
    },
    headerOptions: {
      "X-DUDA-ACCESS-TOKEN": {
        required: true,
      },
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });

  deleteRow = APIEndpoint<
    TokenRequest<Types.DeleteSingleRowPayload>,
    Types.DeleteSingleRowResponse
  >({
    method: "delete",
    path: "/site/{site_name}/collection/{collection_name}/row/{row_id}",
    defaults: {
      host: "api.duda.co",
    },
    headerOptions: {
      "X-DUDA-ACCESS-TOKEN": {
        required: true,
      },
    },
  });

  delete = APIEndpoint<
    TokenRequest<Types.DeleteRowPayload>,
    Types.DeleteRowResponse
  >({
    method: "delete",
    path: "/site/{site_name}/collection/{collection_name}/row",
    defaults: {
      host: "api.duda.co",
    },
    headerOptions: {
      "X-DUDA-ACCESS-TOKEN": {
        required: true,
      },
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });
}

export default AppRows;
export { AppRows };
