import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsOrders extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListOrdersPayload>, Types.ListOrdersResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/orders',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
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

  get = APIEndpoint<TokenRequest<Types.GetOrderPayload>, Types.GetOrderResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/orders/{order_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateOrderPayload>, Types.UpdateOrderResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce/orders/{order_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });
}

export default AppsOrders;
export { AppsOrders };
