import AppsProducts from './Products';
import { SubResource } from '../../base';
// import * as Types from './types';
// import { APIEndpoint } from '../../APIEndpoint';
// import { TokenRequest } from '../types';

class AppsEcomm extends SubResource {
  basePath = '/application';

  products = new AppsProducts(this.base);
}

export default AppsEcomm;
export { AppsEcomm };
