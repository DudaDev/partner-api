import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Diyeditor extends Resource {
  update = APIEndpoint<Types.UpdateSESettingsPayload, Types.UpdateSESettingsResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/simple-editor',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      onboarding_required: {
        type: 'string',
        required: true,
      },
    },
  });
}

export default Diyeditor;
export { Diyeditor };
