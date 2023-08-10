import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Carts extends Resource {
  list = APIEndpoint<Types.ListCartsPayload, Types.ListCartsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/carts',
    defaults: {
      host: 'api.duda.co',
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
}

export default Carts;
export { Carts };
