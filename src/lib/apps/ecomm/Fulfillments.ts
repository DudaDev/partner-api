import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsFulfillments extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListOrderFulfillmentsPayload>, Types.ListOrderFulfillmentsResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/orders/{order_id}/fulfillments',
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

  get = APIEndpoint<TokenRequest<Types.GetOrderFulfillmentPayload>, Types.GetOrderFulfillmentResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/orders/{order_id}/fulfillments/{fulfillment_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    }
  });

  create = APIEndpoint<TokenRequest<Types.CreateOrderFulfillmentPayload>, Types.CreateOrderFulfillmentResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/orders/{order_id}/fulfillments',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    }
  });

  update = APIEndpoint<TokenRequest<Types.UpdateOrderFulfillmentPayload>, Types.UpdateOrderFulfillmentResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce/orders/{order_id}/fulfillments/{fulfillment_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    }
  });
}

export default AppsFulfillments;
export { AppsFulfillments };
