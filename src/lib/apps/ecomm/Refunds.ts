import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsRefunds extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListRefundsPayload>, Types.ListRefundsResponse>({
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

  get = APIEndpoint<TokenRequest<Types.GetRefundPayload>, Types.GetRefundResponse>({
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

export default AppsRefunds;
export { AppsRefunds };
