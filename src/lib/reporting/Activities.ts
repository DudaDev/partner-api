import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Activities extends Resource {
  get = APIEndpoint<Types.GetActivityLogPayload, Types.GetActivityLogResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/activities',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Activities;
export { Activities };
