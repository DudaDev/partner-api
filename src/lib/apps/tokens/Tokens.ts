import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsTokens extends SubResource {
  create = APIEndpoint<TokenRequest<Types.RefreshTokenPayload>, Types.RefreshTokenResponse>({
    method: 'post',
    path: '/{app_uuid}/token/refresh',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    bodyParams: {
      refresh_token: {
        type: 'string',
        required: true,
      },
    },
  });
}

export default AppsTokens;
export { AppsTokens };
