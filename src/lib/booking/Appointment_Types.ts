import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class AppointmentTypes extends Resource {
  list = APIEndpoint<Types.ListBookingAppointmentTypesPayload, Types.ListBookingAppointmentTypesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/booking/appointment-types',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetBookingAppointmentTypesPayload, Types.GetBookingAppointmentTypesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/booking/appointment-types/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateBookingAppointmentTypesPayload, Types.CreateBookingAppointmentTypesResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/booking/appointment-types',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateBookingAppointmentTypesPayload, Types.UpdateBookingAppointmentTypesResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/booking/appointment-types/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteBookingAppointmentTypesPayload, Types.DeleteBookingAppointmentTypesResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/booking/appointment-types/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default AppointmentTypes;
export { AppointmentTypes };
