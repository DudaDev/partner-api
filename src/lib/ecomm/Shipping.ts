import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Shipping extends Resource {
  list = APIEndpoint<Types.ListShippingProvidersPayload, Types.ListShippingProvidersResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-providers',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetShippingProviderPayload, Types.GetShippingProviderResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-providers/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateShippingProviderPayload, Types.CreateShippingProviderResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-providers',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      live_shipping_rates_url: {
        type: 'string',
        required: true,
      },
      test_shipping_rates_url: {
        type: 'string',
        required: false,
      },
    },
  });

  update = APIEndpoint<Types.UpdateShippingProviderPayload, Types.UpdateShippingProviderResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-providers/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      live_shipping_rates_url: {
        type: 'string',
        required: false,
      },
      test_shipping_rates_url: {
        type: 'string',
        required: false,
      },
    },
  });

  delete = APIEndpoint<Types.DeleteShippingProviderPayload, Types.DeleteShippingProviderResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/shipping-providers/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Shipping;
export { Shipping };
