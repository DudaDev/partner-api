import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsAppointments extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListBookingAppointmentsPayload>, Types.ListBookingAppointmentsResponse>({
    method: 'get',
    path: '/site/{site_name}/booking/appointments',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
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

  book = APIEndpoint<TokenRequest<Types.BookAppointmentPayload>, Types.BookAppointmentResponse>({
    method: 'post',
    path: '/site/{site_name}/booking/appointments',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  cancel = APIEndpoint<TokenRequest<Types.CancelBookingAppointmentPayload>, Types.CancelBookingAppointmentResponse>({
    method: 'post',
    path: '/site/{site_name}/booking/appointments/{appointment_uid}/cancel',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  confirm = APIEndpoint<TokenRequest<Types.ConfirmBookingAppointmentPayload>, Types.ConfirmBookingAppointmentResponse>({
    method: 'post',
    path: '/site/{site_name}/booking/appointments/{appointment_uid}/confirm',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  getManageLinks = APIEndpoint<TokenRequest<Types.GetAppointmentManageLinksPayload>, Types.GetAppointmentManageLinksResponse>({
    method: 'get',
    path: '/site/{site_name}/booking/appointments/{appointment_uid}/manage-links',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
    queryParams: {
      lang: {
        type: 'string',
        required: false,
      },
    },
  });

  sendManagementEmail = APIEndpoint<TokenRequest<Types.SendAppointmentManagementEmailPayload>, Types.SendAppointmentManagementEmailResponse>({
    method: 'post',
    path: '/site/{site_name}/booking/appointments/{appointment_uid}/send-management-email',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  reschedule = APIEndpoint<TokenRequest<Types.RescheduleBookingAppointmentPayload>, Types.RescheduleBookingAppointmentResponse>({
    method: 'post',
    path: '/site/{site_name}/booking/appointments/{appointment_uid}/reschedule',
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

export default AppsAppointments;
export { AppsAppointments };
