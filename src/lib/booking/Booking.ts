import Resource from '../base';
import Appointments from './Appointments';

class Booking extends Resource {

  appointments = new Appointments(this.config);;

}

export default Booking;
export { Booking };
