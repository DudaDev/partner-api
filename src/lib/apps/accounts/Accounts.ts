import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsAccounts extends SubResource {
  // eslint-disable-next-line
  getOwner = APIEndpoint<TokenRequest<Types.GetAccountOwnerPayload>, Types.GetAccountOwnerResponse>({
    method: 'get',
    path: '/site/{site_name}/account/details',
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

export default AppsAccounts;
export { AppsAccounts };
