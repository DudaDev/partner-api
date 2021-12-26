import * as collections from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Collections extends Resource {
  get = APIEndpoint<collections.Collections, any>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Collections;
export { Collections };
