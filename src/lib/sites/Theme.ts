import * as Types from './types';

import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Theme extends Resource {
  update = APIEndpoint<Types.UpdateSiteThemePayload, Types.UpdateSiteResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/theme',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      colors: {
        type: 'object',
        required: true,
      },
    },
  });
}

export default Theme;
export { Theme };
