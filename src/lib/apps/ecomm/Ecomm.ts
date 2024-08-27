import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import AppsProducts from './Products';
import AppsOptions from './Options';
import AppsOrders from './Orders';
import AppsPayments from './Payments';
import AppsGateways from './Gateways';
import AppsCarts from './Carts';
import { TokenRequest } from '../types';

class AppsEcomm extends SubResource {
  products = new AppsProducts(this.base);

  options = new AppsOptions(this.base);

  orders = new AppsOrders(this.base);

  payments = new AppsPayments(this.base);

  gateways = new AppsGateways(this.base);

  carts = new AppsCarts(this.base);

  get = APIEndpoint<TokenRequest<Types.GetEcommPayload>, Types.GetEcommResponse>({
    method: 'get',
    path: '/site/{site_name}/ecommerce',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateEcommPayload>, Types.UpdateEcommResponse>({
    method: 'patch',
    path: '/site/{site_name}/ecommerce',
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

export default AppsEcomm;
export { AppsEcomm };
