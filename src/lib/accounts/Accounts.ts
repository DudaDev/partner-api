import * as accounts from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Accounts extends Resource {
  get = APIEndpoint<accounts.Accounts, any>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Accounts;
export { Accounts };
