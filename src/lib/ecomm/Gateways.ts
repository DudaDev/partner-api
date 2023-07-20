import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Gateways extends Resource {
  list = APIEndpoint<Types.ListGatewaysPayload, Types.ListGatewaysResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetGatewayPayload, Types.GatewayResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways/{gateway_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateGatewayPayload, Types.GatewayResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateGatewayPayload, Types.GatewayResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways/{gateway_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteGatewayPayload, void>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways/{gateway_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Gateways;
export { Gateways };
