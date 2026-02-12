import * as Types from "./types";
import { SubResource } from "../../base";
import { APIEndpoint } from "../../APIEndpoint";
import { TokenRequest } from "../types";

class AppsRefundIntent extends SubResource {
  get = APIEndpoint<
    TokenRequest<Types.GetRefundIntentPayload>,
    Types.GetRefundIntentResponse
  >({
    method: "get",
    path: "/site/{site_name}/ecommerce/refund-intents/{refund_intent_id}",
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

export default AppsRefundIntent;
