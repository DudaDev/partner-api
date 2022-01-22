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

  // eslint-disable-next-line
  listDudaTeamGroups = APIEndpoint<Types.ListDudaTeamGroupsPayload, Types.ListDudaTeamGroupsResponse>({
    method: 'get',
    path: '/api/permission-groups/default',
    defaults: {
      host: 'api.duda.co',
    },
  });

  // eslint-disable-next-line
  listCustomTeamGroups = APIEndpoint<Types.ListCustomTeamGroupsPayload, Types.ListCustomTeamGroupsResponse>({
    method: 'get',
    path: '/api/permission-groups/custom',
    defaults: {
      host: 'api.duda.co',
    },
  });

  // eslint-disable-next-line
  assignTeamMemberGroup = APIEndpoint<Types.AssignTeamToGroupPayload, Types.AssignTeamToGroupPayload>({
    method: 'post',
    path: '/api/permission-groups/{group_name}/accounts/{account_name}/add',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Permissions;
export { Permissions };
