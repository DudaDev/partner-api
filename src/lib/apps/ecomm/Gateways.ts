import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsGateways extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListGatewaysPayload>, Types.ListGatewaysResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/payment-gateways',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetGatewayPayload>, Types.GatewayResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce/payment-gateways/{gateway_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  create = APIEndpoint<TokenRequest<Types.CreateGatewayPayload>, Types.GatewayResponse>({
    method: 'post',
    path: '/site/{site_name}/ecommerce/payment-gateways',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateGatewayPayload>, Types.GatewayResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce/payment-gateways/{gateway_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteGatewayPayload>, Types.GatewayResponse>({
    method: 'delete',
    path: '/site/{site_name}/ecommerce/payment-gateways/{gateway_id}',
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

export default AppsGateways;
export { AppsGateways };
