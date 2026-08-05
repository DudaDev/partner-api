import * as Types from './types';
import Resource from '../base';
import Appointments from './Appointments';
import AppointmentTypes from './Appointment_Types';
import StaffMembers from './Staff_Members';
import { APIEndpoint } from '../APIEndpoint';

class Booking extends Resource {
  appointments = new Appointments(this.config);

  appointment_types = new AppointmentTypes(this.config);

  staff_members = new StaffMembers(this.config);

  getAvailability = APIEndpoint<Types.GetBookingAvailabilityPayload, Types.GetBookingAvailabilityResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/booking/availability',
    defaults: {
      host: 'api.duda.co',
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
  })
}

export default Booking;
export { Booking };
