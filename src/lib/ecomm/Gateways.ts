import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Gateways extends Resource {
  create = APIEndpoint<Types.CreateGatewayPayload, Types.CreateGatewayResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Gateways;
export { Gateways };
