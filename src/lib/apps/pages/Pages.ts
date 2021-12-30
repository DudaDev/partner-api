// import * as apps from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';

class AppsPages extends SubResource {
  get = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
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
