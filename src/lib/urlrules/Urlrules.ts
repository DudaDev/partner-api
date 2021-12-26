import * as urlrules from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Urlrules extends Resource {
  get = APIEndpoint<urlrules.Urlrules, any>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Urlrules;
export { Urlrules };
