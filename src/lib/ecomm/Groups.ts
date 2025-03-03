import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Groups extends Resource {
  list = APIEndpoint<Types.ListTaxGroupsPayload, Types.ListTaxGroupsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-groups',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      offset: {
        type: 'number',
        required: false,
      },
      limit: {
        type: 'number',
        required: false,
      },
      direction: {
        type: 'string',
        required: false,
      },
    },
  });

  get = APIEndpoint<Types.GetTaxGroupPayload, Types.GetTaxGroupResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-groups/{group_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateTaxGroupPayload, Types.CreateTaxGroupResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-groups',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateTaxGroupPayload, Types.UpdateTaxGroupResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-groups/{group_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteTaxGroupPayload, Types.DeleteTaxGroupResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/tax-groups/{group_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Groups;
export { Groups };
