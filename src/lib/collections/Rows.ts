import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Rows extends Resource {
  create = APIEndpoint<Types.AddRowPayload, Types.AddRowResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}/row',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });

  update = APIEndpoint<Types.UpdateRowPayload, Types.UpdateRowResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}/row',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });

  delete = APIEndpoint<Types.DeleteRowPayload, Types.DeleteRowResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}/row',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });
}

export default Rows;
export { Rows };
