import * as Types from './types';

import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Theme extends Resource {
  get = APIEndpoint<Types.GetSiteThemePayload, Types.GetSiteThemeResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/theme',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateSiteThemePayload, Types.UpdateSiteThemeResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/theme',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      colors: {
        type: 'array',
        required: true,
      },
    },
  });
}

export default Theme;
export { Theme };
