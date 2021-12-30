import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Permissions extends Resource {
  list = APIEndpoint<null, Types.Permissions>({
    method: 'get',
    path: '/api/accounts/permissions/multiscreen',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetPermissionsPayload, Types.GetPermissionsResponse>({
    method: 'get',
    path: '/api/accounts/{account_name}/sites/{site_name}/permissions',
    defaults: {
      host: 'api.duda.co',
    },
  });

  // eslint-disable-next-line
  listAccessibleSites = APIEndpoint<Types.ListAccessibleSitesPayload, Types.ListAccessibleSitesResponse>({
    method: 'get',
    path: '/api/accounts/grant-access/{account_name}/sites/multiscreen',
    defaults: {
      host: 'api.duda.co',
    },
  });

  grantSiteAccess = APIEndpoint<Types.GrantSiteAccessPayload, Types.GrantSiteAccessResponse>({
    method: 'post',
    path: '/api/accounts/{account_name}/sites/{site_name}/permissions',
    defaults: {
      host: 'api.duda.co',
    },
  });

  removeSiteAccess = APIEndpoint<Types.RemoveSiteAccessPayload, Types.RemoveSiteAccessResponse>({
    method: 'delete',
    path: '/api/accounts/{account_name}/sites/{site_name}/permissions',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Permissions;
export { Permissions };
