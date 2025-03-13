import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Zones extends Resource {
  list = APIEndpoint<Types.ListTaxZonesPayload, Types.ListTaxZonesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones',
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
      direction: {
        type: 'string',
        required: false,
      },
    },
  });

  get = APIEndpoint<Types.GetTaxZonePayload, Types.GetTaxZoneResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateTaxZonePayload, Types.CreateTaxZoneResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateTaxZonePayload, Types.UpdateTaxZoneResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteTaxZonePayload, Types.DeleteTaxZoneResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  listRate = APIEndpoint<Types.ListTaxZoneRatesPayload, Types.ListTaxZoneRatesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates',
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
      direction: {
        type: 'string',
        required: false,
      },
    },
  });

  getRate = APIEndpoint<Types.GetTaxZoneRatePayload, Types.GetTaxZoneRateResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates/{rate_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  createRate = APIEndpoint<Types.CreateTaxZoneRatePayload, Types.CreateTaxZoneRateResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates',
    defaults: {
      host: 'api.duda.co',
    },
  });

  updateRate = APIEndpoint<Types.UpdateTaxZoneRatePayload, Types.UpdateTaxZoneRateResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates/{rate_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  deleteRate = APIEndpoint<Types.DeleteTaxZoneRatePayload, Types.DeleteTaxZoneRateResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates/{rate_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Zones;
export { Zones };
