/* eslint-disable
import/no-unresolved,
import/extensions,
import/prefer-default-export
*/

import Content from './lib/content/Content';
import Reporting from './lib/reporting/Reporting';
import Accounts from './lib/accounts/Accounts';
import Collections from './lib/collections/Collections';
import Plans from './lib/plans/Plans';
import Urlrules from './lib/urlrules/Urlrules';
import Pages from './lib/pages/Pages';
import Sites from './lib/sites/Sites';
import Templates from './lib/templates/Templates';
import { Config } from './lib/base';

const envs = {
  eu: 'api.eu.duda.co',
  direct: 'api.duda.co',
  sandbox: 'api-sandbox.duda.co',
};

function New(opts: Config) {
  const config = new Config(opts);

  // new:resource:
  return {
    content: new Content(config),
    reporting: new Reporting(config),
    accounts: new Accounts(config),
    collections: new Collections(config),
    plans: new Plans(config),
    urlrules: new Urlrules(config),
    pages: new Pages(config),
    sites: new Sites(config),
    templates: new Templates(config),
  };
}

export default New;
export { New, envs };
