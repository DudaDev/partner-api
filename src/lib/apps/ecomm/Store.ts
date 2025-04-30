import * as Types from "./types";
import { TokenRequest } from "../types";
import { SubResource } from "../../base";
import { APIEndpoint } from "../../APIEndpoint";

class AppsStore extends SubResource {
  get = APIEndpoint<TokenRequest<Types.GetStorePayload>, Types.GetStoreResponse>({
    method: "get",
    path: "/site/{site_name}/ecommerce/store",
    defaults: {
      host: "api.duda.co",
    },
    headerOptions: {
      "X-DUDA-ACCESS-TOKEN": {
        required: true,
      },
    },
  });
}

export default AppsStore;
export { AppsStore };
