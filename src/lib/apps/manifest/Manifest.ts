// import * as apps from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';

class AppsManifest extends SubResource {
  get = APIEndpoint<{
    app_uuid: string;
  }, any>({
    method: 'get',
    path: '/{app_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<{
    app_uuid: string;
  }, any>({
    method: 'post',
    path: '/{app_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default AppsManifest;
export { AppsManifest };
