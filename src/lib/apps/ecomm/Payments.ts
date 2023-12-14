import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsPayments extends SubResource {
  get = APIEndpoint<TokenRequest<Types.GetPaymentsPayload>, Types.GetPaymentsResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/payment-sessions/{session_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  confirm = APIEndpoint<TokenRequest<Types.ConfirmPaymentsPayload>, Types.ConfirmPaymentsResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/payment-sessions/{session_id}/confirm',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    bodyParams: {
      state: {
        type: 'string',
        required: true,
      },
      transaction_id: {
        type: 'string',
        required: false,
      },
      icon: {
        type: 'string',
        required: false,
      },
      name: {
        type: 'string',
        required: false,
      },
      instructions: {
        type: 'string',
        required: false,
      },
      links: {
        type: 'object',
        required: false,
      },
      error: {
        type: 'object',
        required: false,
      },
    },
  });
}

export default AppsPayments;
export { AppsPayments };
