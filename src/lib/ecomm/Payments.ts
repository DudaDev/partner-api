import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Payments extends Resource {
  get = APIEndpoint<Types.GetPaymentsPayload, Types.GetPaymentsResponse>({
    method: 'get',
    path: '/api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-sessions/{session_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  confirm = APIEndpoint<Types.ConfirmPaymentsPayload, Types.ConfirmPaymentsResponse>({
    method: 'post',
    path: '/api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-sessions/{session_id}/confirm',
    defaults: {
      host: 'api.duda.co',
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

export default Payments;
export { Payments };
