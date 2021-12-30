import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';
import { copyWithoutKeys } from '../helpers';

class Fields extends Resource {
  create = APIEndpoint<Types.AddFieldPayload, Types.AddFieldResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}/field',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });

  update = APIEndpoint<Types.UpdateFieldPayload, Types.UpdateFieldResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}/field/{field_name}',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return copyWithoutKeys(opts, ['collection_name']);
    },
  });

  delete = APIEndpoint<Types.DeleteFieldPayload, Types.DeleteFieldResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}/field/{field_name}',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return copyWithoutKeys(opts, ['collection_name']);
    },
  });
}

export default Fields;
export { Fields };
