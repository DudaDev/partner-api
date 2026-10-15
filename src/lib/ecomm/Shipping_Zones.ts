import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class ShippingZones extends Resource {
  list = APIEndpoint<Types.ListShippingZonesPayload, Types.ListShippingZonesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones',
    defaults: {
      host: 'api.duda.co',
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

  get = APIEndpoint<Types.GetShippingZonePayload, Types.GetShippingZoneResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateShippingZonePayload, Types.UpdateShippingZoneResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteShippingZonePayload, Types.DeleteShippingZoneResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  listMethod = APIEndpoint<Types.ListShippingZoneMethodsPayload, Types.ListShippingZoneMethodsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods',
    defaults: {
      host: 'api.duda.co',
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

  getMethod = APIEndpoint<Types.GetShippingZoneMethodPayload, Types.GetShippingZoneMethodResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  createMethod = APIEndpoint<Types.CreateShippingZoneMethodPayload, Types.CreateShippingZoneMethodResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods',
    defaults: {
      host: 'api.duda.co',
    },
  });

  updateMethod = APIEndpoint<Types.UpdateShippingZoneMethodPayload, Types.UpdateShippingZoneMethodResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  deleteMethod = APIEndpoint<Types.DeleteShippingZoneMethodPayload, Types.DeleteShippingZoneMethodResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-zones/{zone_id}/shipping-methods/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default ShippingZones;
export { ShippingZones };
