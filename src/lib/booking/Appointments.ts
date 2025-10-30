import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Appointments extends Resource {
  list = APIEndpoint<Types.ListBookingAppointmentsPayload, Types.ListBookingAppointmentsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/booking/appointments',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      limit: {
        type: 'number',
        required: false,
      },
      offset: {
        type: 'number',
        required: false,
      },
      status: {
        type: 'string',
        required: false,
      },
      mode: {
        type: 'string',
        required: false,
      },
      attendee_email: {
        type: 'string',
        required: false,
      },
      appointment_uid: {
        type: 'string',
        required: false,
      },
      appointment_types: {
        type: 'string',
        required: false,
      },
      after_start: {
        type: 'string',
        required: false,
      },
      before_end: {
        type: 'string',
        required: false,
      },
      after_created_at: {
        type: 'string',
        required: false,
      },
      before_created_at: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default Appointments;
export { Appointments };
