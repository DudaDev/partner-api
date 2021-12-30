import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsPages extends SubResource {
  get = APIEndpoint<TokenRequest<Types.V1.GetPagePayload>, Types.V1.GetPageResponse>({
    method: 'get',
    path: '/site/{site_name}/pages',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });
}

export default AppsPages;
export { AppsPages };
