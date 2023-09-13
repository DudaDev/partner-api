import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Categories extends Resource {
  list = APIEndpoint<Types.ListCategoriesPaylaod, Types.ListCategoriesResponse>({
    method: 'get',
    path: '/api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      limit: {
        type: 'number',
        required: false,
      },
      offset: {
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
      search: {
        type: 'string',
        required: false,
      },
      product_id: {
        type: 'string',
        required: false,
      },
      parent_id: {
        type: 'string',
        required: false,
      },
    },
  });

  get = APIEndpoint<Types.GetCategoryPayload, Types.GetCategoryResponse>({
    method: 'get',
    path: '/api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories/{category_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateCategoryPayload, Types.CreateCategoryResponse>({
    method: 'post',
    path: '/api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      title: {
        type: 'string',
        required: false,
      },
      description: {
        type: 'string',
        required: false,
      },
      image: {
        type: 'object',
        required: false,
      },
      seo: {
        type: 'object',
        required: false,
      },
      parent_id: {
        type: 'string',
        required: false,
      },
      products: {
        type: 'array',
        required: false,
      },
      subcategories: {
        type: 'array',
        required: false,
      },
    },
  });

  update = APIEndpoint<Types.UpdateCategoryPayload, Types.UpdateCategoryResponse>({
    method: 'patch',
    path: '/api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories/{category_id}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      title: {
        type: 'string',
        required: false,
      },
      description: {
        type: 'string',
        required: false,
      },
      image: {
        type: 'object',
        required: false,
      },
      seo: {
        type: 'object',
        required: false,
      },
      parent_id: {
        type: 'string',
        required: false,
      },
      products: {
        type: 'array',
        required: false,
      },
      subcategories: {
        type: 'array',
        required: false,
      },
    },
  });

  delete = APIEndpoint<Types.DeleteCategoryPayload, Types.DeleteCategoryResponse>({
    method: 'delete',
    path: '/api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories/{category_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Categories;
export { Categories };
