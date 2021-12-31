import Resource from '../base';

import Backups from './Backups';
import SSL from './SSL';

class Other extends Resource {
  backups = new Backups(this.config);

  ssl = new SSL(this.config);
}

export default Other;
export { Other };
