import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsShipping extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListShippingProvidersPayload>, Types.ListShippingProvidersResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/shipping-providers',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetShippingProviderPayload>, Types.GetShippingProviderResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/shipping-providers/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  create = APIEndpoint<TokenRequest<Types.CreateShippingProviderPayload>, Types.CreateShippingProviderResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/shipping-providers',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
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

  update = APIEndpoint<TokenRequest<Types.UpdateShippingProviderPayload>, Types.UpdateShippingProviderResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce/shipping-providers/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
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

  delete = APIEndpoint<TokenRequest<Types.DeleteShippingProviderPayload>, Types.DeleteShippingProviderResponse>({
    method: 'delete',
    path: '/site/{site_name}/ecommerce/shipping-providers/{id}',
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

export default AppsShipping;
export { AppsShipping };
