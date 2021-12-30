// import * as reporting from './types';
import Resource from '../base';

import Forms from './Forms';
import SiteReporting from './Sites';
import Analytics from './Analytics';
import Activities from './Activities';
import EmailSettings from './EmailSettings';

class Reporting extends Resource {
  sites = new SiteReporting(this.config);

  forms = new Forms(this.config);

  activities = new Activities(this.config);

  analytics = new Analytics(this.config);

  emailSettings = new EmailSettings(this.config);
}

export default Reporting;
export { Reporting };
