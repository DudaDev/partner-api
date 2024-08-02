import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Elements extends Resource {
  list = APIEndpoint<Types.ListPageElementPayload, Types.ListPageElementResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/pages/{page_uuid}/elements',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreatePageElementPayload, Types.CreatePageElementResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/pages/{page_uuid}/elements',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdatePageElementPayload, Types.UpdatePageElementResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/pages/{page_uuid}/elements/{element_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeletePageElementPayload, Types.DeletePageElementResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/pages/{page_uuid}/elements/{element_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Elements;
export { Elements };
