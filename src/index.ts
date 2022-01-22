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

class Duda {
  static Envs = envs;

  // new:resource::type

  appstore: Apps;

  other: Other;

  content: Content;

  reporting: Reporting;

  accounts: Accounts;

  collections: Collections;

  plans: Plans;

  urlRules: Urlrules;

  pages: Pages;

  sites: Sites;

  templates: Templates;

  constructor(opts: DudaConfig) {
    const config = new Config({
      ...opts,
      host: opts.env ?? envs.direct,
    });

    // new:resource::hook
    this.appstore = new Apps(config);
    this.other = new Other(config);
    this.content = new Content(config);
    this.reporting = new Reporting(config);
    this.accounts = new Accounts(config);
    this.collections = new Collections(config);
    this.plans = new Plans(config);
    this.urlRules = new Urlrules(config);
    this.pages = new Pages(config);
    this.sites = new Sites(config);
    this.templates = new Templates(config);
  }
}

export default Duda;
export { Duda };
