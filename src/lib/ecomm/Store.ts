import * as Types from "./types";
import Resource from "../base";
import { APIEndpoint } from "../APIEndpoint";

class Store extends Resource {
  get = APIEndpoint<Types.GetStorePayload, Types.GetStoreResponse>({
    method: "get",
    path: "/api/sites/multiscreen/{site_name}/ecommerce/store",
    defaults: {
      host: "api.duda.co",
    },
  });

  create = APIEndpoint<Types.CreateStorePayload, Types.CreateStoreResponse>({
    method: "post",
    path: "/api/sites/multiscreen/{site_name}/ecommerce/store",
    defaults: {
      host: "api.duda.co",
    },
  });

  delete = APIEndpoint<Types.DeleteStorePayload, Types.DeleteStoreResponse>({
    method: "delete",
    path: "/api/sites/multiscreen/{site_name}/ecommerce/store",
    defaults: {
      host: "api.duda.co",
    },
  });
}

export default Store;
export { Store };
