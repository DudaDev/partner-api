// import * as reporting from './types';
import Resource from '../base';

import Forms from './Forms';
import SiteReporting from './Sites';
import Analytics from './Analytics';
import Activities from './Activities';
import EmailSettings from './EmailSettings';

class Reporting extends Resource {
  sites = new SiteReporting(this.__config);

  forms = new Forms(this.__config);

  activities = new Activities(this.__config);

  analytics = new Analytics(this.__config);

  emailSettings = new EmailSettings(this.__config);
}

export default Reporting;
export { Reporting };
