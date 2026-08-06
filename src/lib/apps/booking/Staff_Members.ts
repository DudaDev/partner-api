import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import AppsAvailability from './Availability';
import { TokenRequest } from '../types';

class AppsStaffMembers extends SubResource {
  availability = new AppsAvailability(this.base);

  list = APIEndpoint<TokenRequest<Types.ListBookingStaffMembersPayload>, Types.ListBookingStaffMembersResponse>({
    method: 'get',
    path: '/site/{site_name}/booking/staff-members',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetBookingStaffMembersPayload>, Types.GetBookingStaffMembersResponse>({
    method: 'get',
    path: '/site/{site_name}/booking/staff-members/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  create = APIEndpoint<TokenRequest<Types.CreateBookingStaffMembersPayload>, Types.CreateBookingStaffMembersResponse>({
    method: 'post',
    path: '/site/{site_name}/booking/staff-members',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateBookingStaffMembersPayload>, Types.UpdateBookingStaffMembersResponse>({
    method: 'put',
    path: '/site/{site_name}/booking/staff-members/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteBookingStaffMembersPayload>, Types.DeleteBookingStaffMembersResponse>({
    method: 'delete',
    path: '/site/{site_name}/booking/staff-members/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });
}

export default AppsStaffMembers;
export { AppsStaffMembers };
