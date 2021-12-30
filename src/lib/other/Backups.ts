import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Backups extends Resource {
  list = APIEndpoint<Types.ListSiteBackupsPayload, Types.ListSiteBackupsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/backups/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateSiteBackupPayload, Types.CreateSiteBackupResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/backups/{site_name}/create',
    defaults: {
      host: 'api.duda.co',
    },
  });

  restore = APIEndpoint<Types.RestoreSiteBackupPayload, Types.RestoreSiteBackupResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/backups/{site_name}/restore/{backup_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteSiteBackupPayload, Types.DeleteSiteBackupResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/backups/{site_name}/{backup_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Backups;
export { Backups };
