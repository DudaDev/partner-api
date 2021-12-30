import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Urlrules extends Resource {
  getAll = APIEndpoint<Types.GetAllURLRulesPayload, Types.GetAllURLRulesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/site/{site_name}/urlrules',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetURLRuleByIDPayload, Types.GetURLRuleByIDResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/site/{site_name}/urlrules/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteURLRulePayload, Types.DeleteURLRuleResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/site/{site_name}/urlrules/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateURLRulePayload, Types.CreateURLRuleResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/site/{site_name}/urlrules',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      source: {
        type: 'string',
        required: true,
      },
      target: {
        type: 'string',
        required: true,
      },
      response_code: {
        type: 'string',
        required: true,
      },
    },
  });

  update = APIEndpoint<Types.UpdateURLRulePayload, Types.UpdateURLRuleResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/site/{site_name}/urlrules/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      source: {
        type: 'string',
        required: false,
      },
      target: {
        type: 'string',
        required: false,
      },
      response_code: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default Urlrules;
export { Urlrules };
