import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Refunds extends Resource {
  list = APIEndpoint<Types.ListRefundsPayload, Types.ListRefundsResponse>({
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

  get = APIEndpoint<Types.GetRefundPayload, Types.GetRefundResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/refunds/{refund_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateRefundPayload, Types.CreateRefundResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/refunds',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Refunds;
export { Refunds };
