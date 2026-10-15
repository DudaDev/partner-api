import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsShippingZones extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListShippingZonesPayload>, Types.ListShippingZonesResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/shipping-zones',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    queryParams: {
      offset: {
        type: 'number',
        required: false,
      },
      limit: {
        type: 'number',
        required: false,
      },
      sort: {
        type: 'string',
        required: false,
      },
      direction: {
        type: 'string',
        required: false,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetShippingZonePayload>, Types.GetShippingZoneResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/shipping-zones/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateShippingZonePayload>, Types.UpdateShippingZoneResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce/shipping-zones/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteShippingZonePayload>, Types.DeleteShippingZoneResponse>({
    method: 'delete',
    path: '/site/{site_name}/ecommerce/shipping-zones/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  listMethod = APIEndpoint<TokenRequest<Types.ListShippingZoneMethodsPayload>, Types.ListShippingZoneMethodsResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    queryParams: {
      offset: {
        type: 'number',
        required: false,
      },
      limit: {
        type: 'number',
        required: false,
      },
      sort: {
        type: 'string',
        required: false,
      },
      direction: {
        type: 'string',
        required: false,
      },
    },
  });

  getMethod = APIEndpoint<TokenRequest<Types.GetShippingZoneMethodPayload>, Types.GetShippingZoneMethodResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  createMethod = APIEndpoint<TokenRequest<Types.CreateShippingZoneMethodPayload>, Types.CreateShippingZoneMethodResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  updateMethod = APIEndpoint<TokenRequest<Types.UpdateShippingZoneMethodPayload>, Types.UpdateShippingZoneMethodResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  deleteMethod = APIEndpoint<TokenRequest<Types.DeleteShippingZoneMethodPayload>, Types.DeleteShippingZoneMethodResponse>({
    method: 'delete',
    path: '/site/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods/{id}',
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

export default AppsShippingZones;
export { AppsShippingZones };
