// import * as apps from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';

class AppsSites extends SubResource {
  get = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'get',
    path: '/site/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  getBrandingDetails = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'get',
    path: '/site/{site_name}/branding',
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
    path: '/site/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  republish = APIEndpoint<{
    site_name: string;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'post',
    path: '/site/{site_name}/republish',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  uploadResource = APIEndpoint<{
    site_name: string;
    raw_body: Array<{
      resource_type: string;
      src: string;
    }>;
    token: string;
  }, {
    site_name: string;
  }>({
    method: 'post',
    path: '/site/{site_name}/resources/upload',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });
}

export default AppsSites;
export { AppsSites };
