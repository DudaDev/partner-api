import * as content from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Content extends Resource {
  get = APIEndpoint<content.Content, any>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Content;
export { Content };
