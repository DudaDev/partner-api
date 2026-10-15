import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsPosts extends SubResource {
  import = APIEndpoint<TokenRequest<Types.ImportBlogPostPayload>, Types.ImportBlogPostResponse>({
    method: 'post',
    path: '/site/{site_name}/blog/posts/import',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  publish = APIEndpoint<TokenRequest<Types.PublishBlogPostPayload>, Types.PublishBlogPostResponse>({
    method: 'post',
    path: '/site/{site_name}/blog/posts/{post_id}/publish',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  unpublish = APIEndpoint<TokenRequest<Types.UnpublishBlogPostPayload>, Types.UnpublishBlogPostResponse>({
    method: 'post',
    path: '/site/{site_name}/blog/posts/{post_id}/unpublish',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateBlogPostPayload>, Types.UpdateBlogPostResponse>({
    method: 'patch',
    path: '/site/{site_name}/blog/posts/{post_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  list = APIEndpoint<TokenRequest<Types.ListBlogPostsPayload>, Types.ListBlogPostsResponse>({
    method: 'get',
    path: '/site/{site_name}/blog/posts',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
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
      content: {
        type: 'boolean',
        required: false,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetBlogPostPayload>, Types.GetBlogPostResponse>({
    method: 'get',
    path: '/site/{site_name}/blog/posts/{post_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteBlogPostPayload>, Types.DeleteBlogPostResponse>({
    method: 'delete',
    path: '/site/{site_name}/blog/posts/{post_id}',
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

export default AppsPosts;
export { AppsPosts };
