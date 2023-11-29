import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsOptions extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListOptionsPayload>, Types.ListOptionsResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/options',
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

  get = APIEndpoint<TokenRequest<Types.GetOptionPayload>, Types.GetOptionResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/options/{option_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<TokenRequest<Types.CreateOptionPayload>, Types.CreateOptionResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/options',
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

  update = APIEndpoint<TokenRequest<Types.UpdateOptionPayload>, Types.UpdateOptionResponse>({
    method: 'put',
    path: '/site/{site_name}/ecommerce/options/{option_id}',
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

  delete = APIEndpoint<TokenRequest<Types.DeleteOptionPayload>, Types.DeleteOptionResponse>({
    method: 'delete',
    path: '/site/{site_name}/ecommerce/options/{option_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  createChoice = APIEndpoint<TokenRequest<Types.CreateOptionChoicePayload>,
  Types.CreateOptionChoiceResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/options/{option_id}/choices',
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

  updateChoice = APIEndpoint<TokenRequest<Types.UpdateOptionChoicePayload>,
  Types.UpdateOptionChoiceResponse>({
    method: 'put',
    path: '/site/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}',
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

  deleteChoice = APIEndpoint<TokenRequest<Types.DeleteOptionChoicePayload>,
  Types.DeleteOptionChoiceResponse>({
    method: 'delete',
    path: '/site/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default AppsOptions;
export { AppsOptions };
