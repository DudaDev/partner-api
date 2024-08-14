import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Blog extends Resource {
  import = APIEndpoint<Types.ImportBlogPayload, Types.ImportBlogResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/blog/import',
    defaults: {
      host: 'api.duda.co',
    },
  });

  importPost = APIEndpoint<Types.ImportBlogPostPayload, Types.ImportBlogPostResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/blog/posts/import',
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
}

export default Blog;
export { Blog };
