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

  book = APIEndpoint<Types.BookAppointmentPayload, Types.BookAppointmentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/booking/appointments',
    defaults: {
      host: 'api.duda.co',
    },
  });

  cancel = APIEndpoint<Types.CancelBookingAppointmentPayload, Types.CancelBookingAppointmentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/booking/appointments/{appointment_uid}/cancel',
    defaults: {
      host: 'api.duda.co',
    },
  });

  confirm = APIEndpoint<Types.ConfirmBookingAppointmentPayload, Types.ConfirmBookingAppointmentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/booking/appointments/{appointment_uid}/confirm',
    defaults: {
      host: 'api.duda.co',
    },
  });

  getManageLinks = APIEndpoint<Types.GetAppointmentManageLinksPayload, Types.GetAppointmentManageLinksResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/booking/appointments/{appointment_uid}/manage-links',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      lang: {
        type: 'string',
        required: false,
      },
    },
  });

  reschedule = APIEndpoint<Types.RescheduleBookingAppointmentPayload, Types.RescheduleBookingAppointmentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/booking/appointments/{appointment_uid}/reschedule',
    defaults: {
      host: 'api.duda.co',
    },
  });

  sendManagementEmail = APIEndpoint<Types.SendAppointmentManagementEmailPayload, Types.SendAppointmentManagementEmailResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/booking/appointments/{appointment_uid}/send-management-email',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Appointments;
export { Appointments };
