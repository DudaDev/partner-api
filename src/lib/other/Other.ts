import Resource from '../base';

import Backups from './Backups';
import SSL from './SSL';

class Other extends Resource {
  backups = new Backups(this.__config);

  ssl = new SSL(this.__config);
}

export default Other;
export { Other };
