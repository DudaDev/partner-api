import * as Types from './types';
import { SubResource } from '../../base';
import { APIEndpoint } from '../../APIEndpoint';
import { TokenRequest } from '../types';

class AppsAppointmentTypes extends SubResource {
  list = APIEndpoint<TokenRequest<Types.ListBookingAppointmentTypesPayload>, Types.ListBookingAppointmentTypesResponse>({
    method: 'get',
    path: '/site/{site_name}/booking/appointment-types',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetBookingAppointmentTypesPayload>, Types.GetBookingAppointmentTypesResponse>({
    method: 'get',
    path: '/site/{site_name}/booking/appointment-types/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  create = APIEndpoint<TokenRequest<Types.CreateBookingAppointmentTypesPayload>, Types.CreateBookingAppointmentTypesResponse>({
    method: 'post',
    path: '/site/{site_name}/booking/appointment-types',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateBookingAppointmentTypesPayload>, Types.UpdateBookingAppointmentTypesResponse>({
    method: 'put',
    path: '/site/{site_name}/booking/appointment-types/{id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteBookingAppointmentTypesPayload>, Types.DeleteBookingAppointmentTypesResponse>({
    method: 'delete',
    path: '/site/{site_name}/booking/appointment-types/{id}',
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

export default AppsAppointmentTypes;
export { AppsAppointmentTypes };
