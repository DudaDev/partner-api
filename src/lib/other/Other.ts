import * as other from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Other extends Resource {
  get = APIEndpoint<other.Other, any>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Other;
export { Other };
