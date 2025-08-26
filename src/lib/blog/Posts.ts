import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Posts extends Resource {
  import = APIEndpoint<Types.ImportBlogPostPayload, Types.ImportBlogPostResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/blog/posts/import',
    defaults: {
      host: 'api.duda.co',
    },
  });

  publish = APIEndpoint<Types.PublishBlogPostPayload, Types.PublishBlogPostResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/blog/posts/{post_id}/publish',
    defaults: {
      host: 'api.duda.co',
    },
  });

  unpublish = APIEndpoint<Types.UnpublishBlogPostPayload, Types.UnpublishBlogPostResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/blog/posts/{post_id}/unpublish',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateBlogPostPayload, Types.UpdateBlogPostResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/blog/posts/{post_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  list = APIEndpoint<Types.ListBlogPostsPayload, Types.ListBlogPostsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/blog/posts',
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
    },
  });

  get = APIEndpoint<Types.GetBlogPostPayload, Types.GetBlogPostResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/blog/posts/{post_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteBlogPostPayload, Types.DeleteBlogPostResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/blog/posts/{post_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Posts;
export { Posts };
