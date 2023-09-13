import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Shipping extends Resource {
  list = APIEndpoint<Types.ListShippingProvidersPayload, Types.ListShippingProvidersResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetShippingProviderPayload, Types.GetShippingProviderResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateCategoryPayload, Types.CreateCategoryResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers',
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

  update = APIEndpoint<Types.UpdateCategoryPayload, Types.UpdateCategoryResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers/{id}',
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

  delete = APIEndpoint<Types.DeleteCategoryPayload, Types.DeleteCategoryResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Shipping;
export { Shipping };
