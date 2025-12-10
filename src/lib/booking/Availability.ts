import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Availability extends Resource {
  get = APIEndpoint<Types.GetBookingStaffMembersAvailabilityPayload, Types.GetBookingStaffMembersAvailabilityResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/booking/staff-members/{id}/availability',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateBookingStaffMembersAvailabilityPayload, Types.UpdateBookingStaffMembersAvailabilityResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/booking/staff-members/{id}/availability',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Availability;
export { Availability };
