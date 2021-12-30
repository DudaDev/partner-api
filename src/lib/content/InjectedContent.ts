import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class InjectedContent extends Resource {
  get = APIEndpoint<Types.GetInjectedContentPayload, Types.GetInjectedContentResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/inject-content/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.InjectContentPayload, Types.InjectContentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/inject-content/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });

  createSPA = APIEndpoint<Types.InjectContentSPAPayload, Types.InjectContentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/inject-content/{site_name}/pages/{page_name}',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });
}

export default InjectedContent;
export { InjectedContent };
