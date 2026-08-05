import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import AppsAppointments from './Appointments';
import AppsAppointmentTypes from './Appointment_Types';
import AppsStaffMembers from './Staff_Members';
import { TokenRequest } from '../types';

class AppsBooking extends SubResource {
  appointments = new AppsAppointments(this.base);

  appointment_types = new AppsAppointmentTypes(this.base);

  staff_members = new AppsStaffMembers(this.base);

  getAvailability = APIEndpoint<TokenRequest<Types.GetBookingAvailabilityPayload>, Types.GetBookingAvailabilityResponse>({
    method: 'get',
    path: '/site/{site_name}/booking/availability',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    queryParams: {
      appointment_type_id: {
        type: 'string',
        required: false,
      },
      start: {
        type: 'string',
        required: false,
      },
      end: {
        type: 'string',
        required: false,
      },
      time_zone: {
        type: 'string',
        required: false,
      },
      duration: {
        type: 'number',
        required: false,
      },
    },
  });

  createWidgetEmbed = APIEndpoint<TokenRequest<Types.CreateBookingWidgetEmbedPayload>, Types.CreateBookingWidgetEmbedResponse>({
    method: 'post',
    path: '/site/{site_name}/booking/widget-embed',
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

export default AppsBooking;
export { AppsBooking };
