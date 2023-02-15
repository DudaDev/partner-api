import * as Types from './types';

import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Authentication extends Resource {
  getSSOLink = APIEndpoint<Types.GetSSOLinkPayload, Types.GetSSOLinkResponse>({
    method: 'get',
    path: '/api/accounts/sso/{account_name}/link',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      site_name: {
        type: 'string',
        required: false,
      },
      target: {
        type: 'string',
        required: false,
      },
    },
  });

  getResetPasswordLink = APIEndpoint<Types.GetPwdLinkPayload, Types.GetPwdLinkResponse>({
    method: 'post',
    path: '/api/accounts/reset-password/{account_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  getWelcomeLink = APIEndpoint<Types.GetPwdLinkPayload, Types.GetPwdLinkResponse>({
    method: 'post',
    path: '/api/accounts/{account_name}/welcome',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Authentication;
export { Authentication };
