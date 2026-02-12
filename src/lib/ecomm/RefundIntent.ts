import * as Types from "./types";
import Resource from "../base";
import { APIEndpoint } from "../APIEndpoint";

class RefundIntents extends Resource {
  get = APIEndpoint<
    Types.GetRefundIntentPayload,
    Types.GetRefundIntentResponse
  >({
    method: "get",
    path: "/api/sites/multiscreen/{site_name}/ecommerce/refund-intents/{refund_intent_id}",
    defaults: {
      host: "api.duda.co",
    },
  });
}

export default RefundIntents;
export { RefundIntents };
