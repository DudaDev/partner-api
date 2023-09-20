import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Variations extends Resource {
  get = APIEndpoint<Types.GetVariationPayload, Types.GetVariationResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}/variations/{variation_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateVariationPayload, Types.UpdateVariationResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}/variations/{variation_id}',
    defaults: {
      host: 'api.duda.co',
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

export default Variations;
export { Variations };
