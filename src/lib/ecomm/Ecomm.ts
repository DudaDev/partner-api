import Resource from '../base';
import Products from './Products';

class Ecomm extends Resource {
  products = new Products(this.config);
}

export default Ecomm;
export { Ecomm };
