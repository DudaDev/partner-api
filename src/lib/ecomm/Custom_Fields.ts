import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class CustomFields extends Resource {
  list = APIEndpoint<Types.ListCustomFieldsPayload, Types.ListCustomFieldsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/custom-fields',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetCustomFieldPayload, Types.GetCustomFieldResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/custom-fields/{custom_field_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateCustomFieldPayload, Types.CreateCustomFieldResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/custom-fields',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteCustomFieldPayload, Types.DeleteCustomFieldResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/ecommerce/custom-fields/{custom_field_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default CustomFields;
export { CustomFields };
