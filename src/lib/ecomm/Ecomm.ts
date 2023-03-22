import Resource from '../base';
import Products from './Products';
import Gateways from './Gateways';

class Ecomm extends Resource {
  gateways = new Gateways(this.config);

  products = new Products(this.config);
}

export default Ecomm;
export { Ecomm };
