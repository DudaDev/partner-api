import * as reporting from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Reporting extends Resource {
  get = APIEndpoint<reporting.Reporting, any>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Reporting;
export { Reporting };
