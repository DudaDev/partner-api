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
    queryParams: {
      limit: {
        type: 'number',
        required: false,
      },
      offset: {
        type: 'number',
        required: false,
      },
      from: {
        type: 'string',
        required: false,
      },
      to: {
        type: 'string',
        required: false,
      },
      activities: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default Activities;
export { Activities };
