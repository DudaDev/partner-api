import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class ProductCategories extends Resource {
  list = APIEndpoint<Types.ListProductCategoriesPayload, Types.ListProductCategoriesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/product-categories',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      category_ids: {
        type: 'string',
        required: false,
      },
      limit: {
        type: 'number',
        required: false,
      },
      cursor: {
        type: 'string',
        required: false,
      },
    },
  });

  create = APIEndpoint<Types.CreateProductCategoriesPayload, Types.CreateProductCategoriesResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/product-categories',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteProductCategoriesPayload, Types.DeleteProductCategoriesResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/product-categories/delete',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default ProductCategories;
export { ProductCategories };
