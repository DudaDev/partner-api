import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Forms extends Resource {
  submissions = APIEndpoint<Types.GetFormSubmissionsPayload, Types.GetFormSubmissionsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/get-forms/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Forms;
export { Forms };
