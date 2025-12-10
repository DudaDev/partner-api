import Resource from '../base';
import Appointments from './Appointments';
import AppointmentTypes from './Appointment_Types';
import StaffMembers from './Staff_Members';

class Booking extends Resource {

  appointments = new Appointments(this.config);

  appointment_types = new AppointmentTypes(this.config);

  staff_members = new StaffMembers(this.config);

}

export default Booking;
export { Booking };
