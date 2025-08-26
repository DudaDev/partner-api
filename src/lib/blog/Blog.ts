import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';
import Posts from './Posts';

class Blog extends Resource {
  posts = new Posts(this.config);

  import = APIEndpoint<Types.ImportBlogPayload, Types.ImportBlogResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/blog/import',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteBlogPayload, Types.DeleteBlogResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/blog',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateBlogPayload, Types.CreateBlogResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/blog',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateBlogPayload, Types.UpdateBlogResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/blog',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetBlogPayload, Types.GetBlogResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/blog',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Blog;
export { Blog };
