import Resource from '../base';
import Carts from './Carts';
import Orders from './Orders';
import Gateways from './Gateways';
import Payments from './Payments';
import Products from './Products';
import * as Types from './types';
import { APIEndpoint } from '../APIEndpoint';

class Ecomm extends Resource {
  carts = new Carts(this.config);

  orders = new Orders(this.config);

  gateways = new Gateways(this.config);

  payments = new Payments(this.config);

  products = new Products(this.config);

  get = APIEndpoint<Types.GetEcommPayload, Types.GetEcommResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateEcommPayload, Types.UpdateEcommResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Ecomm;
export { Ecomm };
