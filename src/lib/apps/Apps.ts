// import * as apps from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

import AppsSWH from './swh/SWH';
import Utils from './utils/Utils';
import AppsPages from './pages/Pages';
import AppsSites from './sites/Sites';
import AppsTokens from './tokens/Tokens';
import AppsContent from './content/Content';
import AppsManifest from './manifest/Manifest';
import AppsAccounts from './accounts/Accounts';
import { RequestOptions } from '../http';

class Apps extends Resource {
  /** @internal */
  basePath = '/api/integrationhub/application';

  sites = new AppsSites(this);

  tokens = new AppsTokens(this);

  pages = new AppsPages(this);

  content = new AppsContent(this);

  manifest = new AppsManifest(this);

  accounts = new AppsAccounts(this);

  sitewidehtml = new AppsSWH(this);

  utils = Utils;

  ping = APIEndpoint<any, any>({
    method: 'get',
    path: '/health',
    defaults: {
      host: 'api.duda.co',
      basePath: '/api/integrationhub',
    },
  });

  /** @internal */
  // eslint-disable-next-line
  buildRequest(req: RequestOptions, def: any, opts: any) {
    if (opts.token) {
      req.headers!['X-DUDA-ACCESS-TOKEN'] = `Bearer ${opts.token}`;
      // eslint-disable-next-line
      delete opts.token;
    }

    // TODO: move to APIEndpoint as default behavior
    if (def.defaults.basePath) {
      req.path = def.defaults.basePath + def.path;
    }

    return req;
  }
}

export default Apps;
export { Apps };
