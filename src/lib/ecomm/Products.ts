import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Products extends Resource {
  create = APIEndpoint<Types.CreateProductPayload, Types.CreateProductResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/products',
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
