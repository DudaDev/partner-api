// import * as apps from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';

class AppsTokens extends SubResource {
  refresh = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'post',
    path: '/{app_uuid}/token/refresh',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default AppsTokens;
export { AppsTokens };
