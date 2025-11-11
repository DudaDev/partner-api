import Resource from '../base';
import Appointments from './Appointments';
import AppointmentTypes from './Appointment_Types';

class Booking extends Resource {

  appointments = new Appointments(this.config);

  appointment_types = new AppointmentTypes(this.config);

}

export default Booking;
export { Booking };
