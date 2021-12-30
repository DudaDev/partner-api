import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import AppsContentLocation from './Locations';
import { TokenRequest } from '../types';

class AppsContent extends SubResource {
  basePath = '/application';

  locations = new AppsContentLocation(this.__base);

  get = APIEndpoint<TokenRequest<Types.GetContentPayload>, Types.ContentLibrary>({
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

  update = APIEndpoint<TokenRequest<Types.UpdateContentPayload>, Types.UpdateContentResponse>({
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

  publish = APIEndpoint<TokenRequest<Types.PublishContentPayload>, Types.PublishContentResponse>({
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
