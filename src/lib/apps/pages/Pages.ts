import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsPages extends SubResource {
  get = APIEndpoint<TokenRequest<Types.V2.ListPagesPayload>, Types.V2.ListPagesResponse>({
    method: 'get',
    path: '/site/{site_name}/v2/pages',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.V2.UpdatePagePayload>, Types.V2.UpdatePageResponse>({
    method: 'put',
    path: '/site/{site_name}/v2/pages/{page_uuid}',
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
