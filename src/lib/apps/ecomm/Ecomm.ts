import AppsProducts from './Products';
import AppsOptions from './Options';
import AppsOrders from './Orders';
import { SubResource } from '../../base';
// import * as Types from './types';
// import { APIEndpoint } from '../../APIEndpoint';
// import { TokenRequest } from '../types';

class AppsEcomm extends SubResource {
  basePath = '/application';

  products = new AppsProducts(this.base);

  options = new AppsOptions(this.base);

  orders = new AppsOrders(this.base);
}

export default AppsEcomm;
export { AppsEcomm };
