import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';

class AppsTokens extends SubResource {
  refresh = APIEndpoint<Types.RefreshTokenPayload, Types.RefreshTokenPayload>({
    method: 'post',
    path: '/{app_uuid}/token/refresh',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default AppsTokens;
export { AppsTokens };
