import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';
import Permissions from './Permissions';
import Authentication from './Authentication';

class Accounts extends Resource {
  permissions = new Permissions(this.__config);

  authentication = new Authentication(this.__config);

  get = APIEndpoint<Types.GetAccountPayload, Types.GetAccountResponse>({
    method: 'get',
    path: '/api/accounts/{account_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteAccountPayload, Types.DeleteAccountResponse>({
    method: 'delete',
    path: '/api/accounts/{account_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateAccountPayload, Types.CreateAccountResponse>({
    method: 'post',
    path: '/api/accounts/create',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      account_name: {
        type: 'string',
        required: true,
      },
      first_name: {
        type: 'string',
        required: false,
      },
      last_name: {
        type: 'string',
        required: false,
      },
      lang: {
        type: 'string',
        required: false,
      },
      email: {
        type: 'string',
        required: false,
      },
      account_type: {
        type: 'string',
        required: false,
      },
    },
  });

  update = APIEndpoint<Types.UpdateAccountPayload, Types.UpdateAccountResponse>({
    method: 'post',
    path: '/api/accounts/update/{account_name}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      first_name: {
        type: 'string',
        required: false,
      },
      last_name: {
        type: 'string',
        required: false,
      },
      lang: {
        type: 'string',
        required: false,
      },
      email: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default Accounts;
export { Accounts };
