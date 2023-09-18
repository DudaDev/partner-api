import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Products extends Resource {
  list = APIEndpoint<Types.ListProductsPayload, Types.ListProductsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/products',
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

  get = APIEndpoint<Types.GetProductPayload, Types.GetProductResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateProductPayload, Types.CreateProductResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/products',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateProductPayload, Types.UpdateProductResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteProductPayload, Types.DeleteProductResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Products;
export { Products };
