import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsManifest extends SubResource {
  get = APIEndpoint<TokenRequest<Types.GetManifestPayload>, Types.Manifest>({
    method: 'get',
    path: '/{app_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<TokenRequest<Types.Manifest>, null>({
    method: 'post',
    path: '/{app_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default AppsManifest;
export { AppsManifest };
