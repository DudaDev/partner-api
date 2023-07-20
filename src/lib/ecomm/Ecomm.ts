import Resource from '../base';
import Products from './Products';
import Gateways from './Gateways';
import * as Types from './types';
import { APIEndpoint } from '../APIEndpoint';

class Ecomm extends Resource {
  gateways = new Gateways(this.config);

  products = new Products(this.config);

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
