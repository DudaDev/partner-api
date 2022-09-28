import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class MultiLocation extends Resource {
  get = APIEndpoint<Types.GetLocationPayload, Types.GetLocationResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/content/location/{location_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateLocationPayload, Types.CreateLocationResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/content/location',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateLocationPayload, Types.UpdateLocationResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/content/location/{location_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteLocationPayload, Types.DeleteLocationResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/content/location/{location_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default MultiLocation;
export { MultiLocation };
