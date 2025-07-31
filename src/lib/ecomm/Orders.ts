import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';
import Refunds from './Refunds';

class Orders extends Resource {
  refunds = new Refunds(this.config);

  list = APIEndpoint<Types.ListOrdersPayload, Types.ListOrdersResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders',
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

  get = APIEndpoint<Types.GetOrderPayload, Types.GetOrderResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateOrderPayload, Types.CreateOrderResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateOrderPayload, Types.UpdateOrderResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  listRefund = APIEndpoint<Types.ListRefundsPayload, Types.ListRefundsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/refunds',
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

  getRefund = APIEndpoint<Types.GetRefundPayload, Types.GetRefundResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/refunds/{refund_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  listFulfillments = APIEndpoint<Types.ListOrderFulfillmentsPayload, Types.ListOrderFulfillmentsResponse>({
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

  getFulfillment = APIEndpoint<Types.GetOrderFulfillmentPayload, Types.GetOrderFulfillmentResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/fulfillments/{fulfillment_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  createFulfillment = APIEndpoint<Types.CreateOrderFulfillmentPayload, Types.CreateOrderFulfillmentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/fulfillments',
    defaults: {
      host: 'api.duda.co',
    },
  });

  updateFulfillment = APIEndpoint<Types.UpdateOrderFulfillmentPayload, Types.UpdateOrderFulfillmentResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/fulfillments/{fulfillment_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Orders;
export { Orders };
