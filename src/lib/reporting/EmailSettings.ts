import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class EmailSettings extends Resource {
  get = APIEndpoint<Types.GetEmailSettingsPayload, Types.GetEmailSettingsResponse>({
    method: 'get',
    path: '/api/accounts/{account_name}/sites/{site_name}/stats-email',
    defaults: {
      host: 'api.duda.co',
    },
  });

  subscribe = APIEndpoint<Types.SubscribeCustomerPayload, Types.SubscribeCustomerResponse>({
    method: 'post',
    path: '/api/accounts/{account_name}/sites/{site_name}/stats-email',
    defaults: {
      host: 'api.duda.co',
    },
  });

  unsubscribe = APIEndpoint<Types.UnsubscribeCustomerPayload, Types.UnsubscribeCustomerResponse>({
    method: 'delete',
    path: '/api/accounts/{account_name}/sites/{site_name}/stats-email',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default EmailSettings;
export { EmailSettings };
