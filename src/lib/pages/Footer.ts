import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Footer extends Resource {
  list = APIEndpoint<Types.ListFooterPageElementPayload, Types.ListFooterPageElementResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/footer/elements',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateFooterPageElementPayload, Types.CreateFooterPageElementResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/footer/elements',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateFooterPageElementPayload, Types.UpdateFooterPageElementResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/footer/elements/{element_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteFooterPageElementPayload, Types.DeleteFooterPageElementResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/footer/elements/{element_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Footer;
export { Footer };
