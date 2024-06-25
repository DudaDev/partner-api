import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Navigation extends Resource {
  list = APIEndpoint<Types.ListNavigationPayload, Types.ListNavigationResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/navigation',
    defaults: {
      host: 'api.duda.co',
    },
  });

  getByLang = APIEndpoint<Types.GetByLangNavigationPayload, Types.GetByLangNavigationResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/navigation/{lang}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateNavigationPayload, Types.CreateNavigationResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/navigation/{lang}/items',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      title: {
        type: 'string',
        required: true,
      },
      type: {
        type: 'string',
        required: true,
      },
      hidden: {
        type: 'array',
        required: false,
      },
      parent_id: {
        type: 'string',
        required: false,
      },
      next_sibling_id: {
        type: 'string',
        required: false,
      },
    },
  });

  update = APIEndpoint<Types.UpdateNavigationPayload, Types.UpdateNavigationResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/navigation/{lang}/items/{navigation_id}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      hidden: {
        type: 'array',
        required: false,
      },
      parent_id: {
        type: 'string',
        required: false,
      },
      next_sibling_id: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default Navigation;
export { Navigation };
