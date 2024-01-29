import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsCarts extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListCartsPayload>, Types.ListCartsResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/carts',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    queryParams: {
      status: {
        type: 'string',
        required: false,
      },
      mode: {
        type: 'string',
        required: false,
      },
      email: {
        type: 'string',
        required: false,
      },
      cursor: {
        type: 'string',
        required: false,
      },
      limit: {
        type: 'number',
        required: false,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetCartPayload>, Types.GetCartResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/carts/{cart_id}',
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

export default AppsCarts;
export { AppsCarts };
