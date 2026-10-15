import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import AppsPosts from './Posts';
import { TokenRequest } from '../types';

class AppsBlog extends SubResource {
  posts = new AppsPosts(this.base);

  get = APIEndpoint<TokenRequest<Types.GetBlogPayload>, Types.GetBlogResponse>({
    method: 'get',
    path: '/site/{site_name}/blog',
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

export default AppsBlog;
export { AppsBlog };
