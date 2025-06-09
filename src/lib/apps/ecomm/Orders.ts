import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';
import AppsRefunds from './Refunds';

class AppsOrders extends SubResource {
  refunds = new AppsRefunds(this.base);

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

  create = APIEndpoint<TokenRequest<Types.CreateOrderPayload>, Types.CreateOrderResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/orders',
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

  listRefund = APIEndpoint<TokenRequest<Types.ListRefundsPayload>, Types.ListRefundsResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/orders/{order_id}/refunds',
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

  getRefund = APIEndpoint<TokenRequest<Types.GetRefundPayload>, Types.GetRefundResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/orders/{order_id}/refunds/{refund_id}',
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
