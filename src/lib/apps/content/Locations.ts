import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsContentLocation extends SubResource {
  create = APIEndpoint<TokenRequest<Types.CreateLocationPayload>, Types.CreateLocationResponse>({
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

  get = APIEndpoint<TokenRequest<Types.GetLocationPayload>, Types.GetLocationResponse>({
    method: 'get',
    path: '/site/{site_name}/content/location/{location_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateLocationPayload>, Types.UpdateLocationResponse>({
    method: 'post',
    path: '/site/{site_name}/content/location/{location_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteLocationPayload>, Types.DeleteLocationResponse>({
    method: 'delete',
    path: '/site/{site_name}/content/location/{location_id}',
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
