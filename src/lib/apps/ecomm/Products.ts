import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsProducts extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListProductsPayload>, Types.ListProductsResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/products',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetProductPayload>, Types.GetProductResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/products/{product_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  create = APIEndpoint<TokenRequest<Types.CreateProductPayload>, Types.CreateProductResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/products',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateProductPayload>, Types.UpdateProductResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce/products/{product_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteProductPayload>, Types.DeleteProductResponse>({
    method: 'delete',
    path: '/site/{site_name}/ecommerce/products/{product_id}',
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

export default AppsProducts;
export { AppsProducts };
