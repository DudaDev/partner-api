// import * as apps from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import AppsContentLocation from './Locations';

class AppsContent extends SubResource {
  basePath = '/application';

  locations = new AppsContentLocation(this.base);

  get = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'get',
    path: '/site/{site_name}/content',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'post',
    path: '/site/{site_name}/content',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  publish = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'post',
    path: '/site/{site_name}/content/publish',
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

export default AppsContent;
export { AppsContent };
