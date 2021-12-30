import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class SSL extends Resource {
  create = APIEndpoint<Types.GenerateSSLPayload, Types.GenerateSSLResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/certificate',
    defaults: {
      host: 'api.duda.co',
    },
  });

  renew = APIEndpoint<Types.RenewSSLPayload, Types.RenewSSLResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/certificate/renew',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteSSLPayload, Types.DeleteSSLResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/certificate',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default SSL;
export { SSL };
