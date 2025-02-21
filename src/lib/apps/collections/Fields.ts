import * as Types from "./types";
import { TokenRequest } from "../types";
import { SubResource } from "../../base";

import { APIEndpoint } from "../../APIEndpoint";
import { copyWithoutKeys } from "../../helpers";

class AppFields extends SubResource {
  create = APIEndpoint<TokenRequest<Types.AddFieldPayload>, Types.AddFieldResponse>({
    method: "post",
    path: "/site/{site_name}/collection/{collection_name}/field",
    defaults: {
      host: "api.duda.co",
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateFieldPayload>, Types.UpdateFieldResponse>({
    method: "put",
    path: "/site/{site_name}/collection/{collection_name}/field/{field_name}",
    defaults: {
      host: "api.duda.co",
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    beforeRequest(opts) {
      return copyWithoutKeys(opts, ["collection_name", "token"]);
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteFieldPayload>, Types.DeleteFieldResponse>({
    method: "delete",
    path: "/site/{site_name}/collection/{collection_name}/field/{field_name}",
    defaults: {
      host: "api.duda.co",
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    beforeRequest(opts) {
      return copyWithoutKeys(opts, ["collection_name"]);
    },
  });
}

export default AppFields;
export { AppFields };
