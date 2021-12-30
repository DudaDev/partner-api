import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsSites extends SubResource {
  get = APIEndpoint<TokenRequest<Types.GetSiteByNamePayload>, Types.GetSiteResponse>({
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

  // eslint-disable-next-line
  getBrandingDetails = APIEndpoint<TokenRequest<Types.GetBrandingPayload>, Types.GetBrandingResponse>({
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

  update = APIEndpoint<TokenRequest<Types.UpdateSitePayload>, Types.UpdateSiteResponse>({
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

  republish = APIEndpoint<TokenRequest<Types.PublishSitePayload>, Types.PublishSiteResponse>({
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

  // eslint-disable-next-line
  uploadResources = APIEndpoint<TokenRequest<Types.UploadResourcesPayload>, Types.UploadResourceResponse>({
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
