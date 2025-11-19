import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';
import Availability from './Availability';

class StaffMembers extends Resource {

  availability = new Availability(this.config);

  list = APIEndpoint<Types.ListBookingStaffMembersPayload, Types.ListBookingStaffMembersResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/booking/staff-members',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetBookingStaffMembersPayload, Types.GetBookingStaffMembersResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/booking/staff-members/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateBookingStaffMembersPayload, Types.CreateBookingStaffMembersResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/booking/staff-members',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateBookingStaffMembersPayload, Types.UpdateBookingStaffMembersResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/booking/staff-members/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteBookingStaffMembersPayload, Types.DeleteBookingStaffMembersResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/booking/staff-members/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default StaffMembers;
export { StaffMembers };
