import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';

const template = {
  method: 'post' as const,
  path: '/{app_uuid}/token/refresh',
  defaults: {
    host: 'api.duda.co',
  },
  bodyParams: {
    refresh_token: {
      type: 'string' as const,
      required: true,
    },
  },
};

class AppsTokens extends SubResource {
  create = APIEndpoint<Types.RefreshTokenPayload, Types.RefreshTokenResponse>(template);

  refresh = APIEndpoint<Types.RefreshTokenPayload, Types.RefreshTokenResponse>(template);
}

export default AppsTokens;
export { AppsTokens };
