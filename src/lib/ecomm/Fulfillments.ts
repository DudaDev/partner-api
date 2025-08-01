import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Fulfillments extends Resource {
  list = APIEndpoint<Types.ListOrderFulfillmentsPayload, Types.ListOrderFulfillmentsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/fulfillments',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      offset: {
        type: 'number',
        required: false,
      },
      limit: {
        type: 'number',
        required: false,
      },
      sort: {
        type: 'string',
        required: false,
      },
      direction: {
        type: 'string',
        required: false,
      },
    },
  });

  get = APIEndpoint<Types.GetOrderFulfillmentPayload, Types.GetOrderFulfillmentResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/fulfillments/{fulfillment_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateOrderFulfillmentPayload, Types.CreateOrderFulfillmentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/fulfillments',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateOrderFulfillmentPayload, Types.UpdateOrderFulfillmentResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/fulfillments/{fulfillment_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Fulfillments;
export { Fulfillments };
