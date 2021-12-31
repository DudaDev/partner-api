/* eslint-disable
import/no-unresolved,
import/extensions,
import/prefer-default-export
*/
import Apps from './lib/apps/Apps';
import Other from './lib/other/Other';
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

interface DudaConfig extends Config {
  env?: string;
}

function New(opts: DudaConfig) {
  const config = new Config({
    ...opts,
    host: opts.env ?? envs.direct,
  });

  // new:resource:
  return {
    appstore: new Apps(config),
    other: new Other(config),
    content: new Content(config),
    reporting: new Reporting(config),
    accounts: new Accounts(config),
    collections: new Collections(config),
    plans: new Plans(config),
    urlRules: new Urlrules(config),
    pages: new Pages(config),
    sites: new Sites(config),
    templates: new Templates(config),
  };
}

export default New;
export { New, envs };
