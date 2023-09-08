import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Orders extends Resource {
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
}

export default Orders;
export { Orders };
