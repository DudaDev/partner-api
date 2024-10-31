/* eslint-disable
import/no-unresolved,
import/extensions,
import/prefer-default-export
*/
import {EventEmitter} from 'events';
import Accounts from './lib/accounts/Accounts';
import Apps, { DudaAppConfig } from './lib/apps/Apps';
import Blog from './lib/blog/Blog';
import Collections from './lib/collections/Collections';
import Content from './lib/content/Content';
import Diyeditor from './lib/diyeditor/Diyeditor';
import Ecomm from './lib/ecomm/Ecomm';
import Navigation from './lib/navigation/Navigation';
import Other from './lib/other/Other';
import Pages from './lib/pages/Pages';
import Plans from './lib/plans/Plans';
import Reporting from './lib/reporting/Reporting';
import Sections from './lib/sections/Sections';
import Sites from './lib/sites/Sites';
import Templates from './lib/templates/Templates';
import Urlrules from './lib/urlrules/Urlrules';
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

  events: EventEmitter;

  accounts: Accounts;

  appstore: Apps;

  blog: Blog;

  collections: Collections;

  content: Content;

  diyEditor: Diyeditor;

  ecomm: Ecomm;

  navigation: Navigation;

  other: Other;

  pages: Pages;

  plans: Plans;

  reporting: Reporting;

  sections: Sections;

  sites: Sites;

  templates: Templates;

  urlRules: Urlrules;

  constructor(opts: DudaConfig, appOpts?: DudaAppConfig) {
    const config = new Config({
      ...opts,
      host: opts.env ?? envs.direct,
    });

    this.events = new EventEmitter();

    // new:resource::hook
    this.appstore = new Apps(config, this.events, appOpts);
    this.accounts = new Accounts(config);
    this.blog = new Blog(config);
    this.collections = new Collections(config);
    this.content = new Content(config);
    this.diyEditor = new Diyeditor(config);
    this.ecomm = new Ecomm(config);
    this.navigation = new Navigation(config);
    this.other = new Other(config);
    this.pages = new Pages(config);
    this.plans = new Plans(config);
    this.reporting = new Reporting(config);
    this.sections = new Sections(config);
    this.sites = new Sites(config);
    this.templates = new Templates(config);
    this.urlRules = new Urlrules(config);
  }
}

export default Duda;
export { Duda };
