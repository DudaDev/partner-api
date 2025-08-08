import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Choices extends Resource {
  create = APIEndpoint<Types.CreateOptionChoicePayload, Types.CreateOptionChoiceResponse>({
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

  update = APIEndpoint<Types.UpdateOptionChoicePayload, Types.UpdateOptionChoiceResponse>({
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

  delete = APIEndpoint<Types.DeleteOptionChoicePayload, Types.DeleteOptionChoiceResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Choices;
export { Choices };
