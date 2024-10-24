import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsVariations extends SubResource {
  get = APIEndpoint<TokenRequest<Types.GetVariationPayload>, Types.GetVariationResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/products/{product_id}/variations/{variation_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateVariationPayload>, Types.UpdateVariationResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce/products/{product_id}/variations/{variation_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    bodyParams: {
      external_id: {
        type: 'string',
        required: false,
      },
      images: {
        type: 'array',
        required: false,
      },
      price_difference: {
        type: 'string',
        required: false,
      },
      quantity: {
        type: 'number',
        required: false,
      },
      sku: {
        type: 'string',
        required: false,
      },
      status: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default AppsVariations;
export { AppsVariations };
