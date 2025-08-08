import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsChoices extends SubResource {
  create = APIEndpoint<TokenRequest<Types.CreateOptionChoicePayload>,
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

  update = APIEndpoint<TokenRequest<Types.UpdateOptionChoicePayload>,
  Types.UpdateOptionChoiceResponse>({
    method: 'put',
    path: '/site/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    bodyParams: {
      value: {
        type: 'string',
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteOptionChoicePayload>,
  Types.DeleteOptionChoiceResponse>({
    method: 'delete',
    path: '/site/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });
}

export default AppsChoices;
export { AppsChoices };
