import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsAvailability extends SubResource {
  get = APIEndpoint<TokenRequest<Types.GetBookingStaffMembersAvailabilityPayload>, Types.GetBookingStaffMembersAvailabilityResponse>({
    method: 'get',
    path: '/site/{site_name}/booking/staff-members/{id}/availability',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateBookingStaffMembersAvailabilityPayload>, Types.UpdateBookingStaffMembersAvailabilityResponse>({
    method: 'put',
    path: '/site/{site_name}/booking/staff-members/{id}/availability',
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

export default AppsAvailability;
export { AppsAvailability };
