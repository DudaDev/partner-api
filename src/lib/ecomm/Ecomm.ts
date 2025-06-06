import Resource from '../base';
import Carts from './Carts';
import Groups from './Groups';
import Zones from './Zones';
import Orders from './Orders';
import Gateways from './Gateways';
import Payments from './Payments';
import Categories from './Categories';
import Shipping from './Shipping';
import Products from './Products';
import Options from './Options';
import Variations from './Variations';
import Store from './Store';
import * as Types from './types';
import { APIEndpoint } from '../APIEndpoint';

class Ecomm extends Resource {
  carts = new Carts(this.config);

  groups = new Groups(this.config);

  zones = new Zones(this.config);

  orders = new Orders(this.config);

  gateways = new Gateways(this.config);

  payments = new Payments(this.config);

  categories = new Categories(this.config);

  shipping = new Shipping(this.config);

  products = new Products(this.config);

  options = new Options(this.config);

  variations = new Variations(this.config);

  store = new Store(this.config);

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
