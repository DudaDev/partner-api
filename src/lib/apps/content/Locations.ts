import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';

class AppsContentLocation extends SubResource {
  create = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'post',
    path: '/site/{site_name}/content/location',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  get = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'get',
    path: '/site/{site_name}/content/location/{location_uuid}',
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
    path: '/site/{site_name}/content/location/{location_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'delete',
    path: '/site/{site_name}/content/location/{location_uuid}',
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

export default AppsContentLocation;
export { AppsContentLocation };
