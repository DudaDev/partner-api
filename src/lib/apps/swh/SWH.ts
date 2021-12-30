import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsSWH extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListSWHPayload>, Types.ListSWHResponse>({
    method: 'get',
    path: '/site/{site_name}/sitewidehtml/list',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetSWHPayload>, Types.GetSWHResponse>({
    method: 'get',
    path: '/site/{site_name}/sitewidehtml/{swh_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  add = APIEndpoint<TokenRequest<Types.CreateSWHPayload>, Types.CreateSWHResponse>({
    method: 'post',
    path: '/site/{site_name}/sitewidehtml',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateSWHPayload>, Types.UpdateSWHResponse>({
    method: 'put',
    path: '/site/{site_name}/sitewidehtml/{swh_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteSWHPayload>, Types.DeleteSWHResponse>({
    method: 'delete',
    path: '/site/{site_name}/sitewidehtml/{swh_uuid}',
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

export default AppsSWH;
export { AppsSWH };
