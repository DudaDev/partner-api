import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Options extends Resource {
  list = APIEndpoint<Types.ListOptionsPayload, Types.ListOptionsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      offset: {
        type: 'number',
        required: false,
      },
      limit: {
        type: 'number',
        required: false,
      },
      sort: {
        type: 'string',
        required: false,
      },
      direction: {
        type: 'string',
        required: false,
      },
    },
  });

  get = APIEndpoint<Types.GetOptionPayload, Types.GetOptionResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateOptionPayload, Types.CreateOptionResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      choices: {
        type: 'array',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
    },
  });

  update = APIEndpoint<Types.UpdateOptionPayload, Types.UpdateOptionResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      name: {
        type: 'string',
        required: true,
      },
    },
  });

  delete = APIEndpoint<Types.DeleteOptionPayload, Types.DeleteOptionResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  createChoice = APIEndpoint<Types.CreateOptionChoicePayload, Types.CreateOptionChoiceResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}/choices',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      value: {
        type: 'string',
        required: true,
      },
    },
  });

  updateChoice = APIEndpoint<Types.UpdateOptionChoicePayload, Types.UpdateOptionChoiceResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      value: {
        type: 'string',
        required: true,
      },
    },
  });

  deleteChoice = APIEndpoint<Types.DeleteOptionChoicePayload, Types.DeleteOptionChoiceResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Options;
export { Options };
