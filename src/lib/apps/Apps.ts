import {EventEmitter} from 'events';
// import * as apps from './types';
import Resource, { Config } from '../base';
import { APIEndpoint } from '../APIEndpoint';

import AppsSWH from './swh/SWH';
import Utils from './utils/Utils';
import AppsPages from './pages/Pages';
import AppsSites from './sites/Sites';
import AppsTokens from './tokens/Tokens';
import AppsContent from './content/Content';
import AppsManifest from './manifest/Manifest';
import AppsAccounts from './accounts/Accounts';
import AppsEcomm from './ecomm/Ecomm';
import { RequestOptions } from '../http';

const DEFAULT_EXPIRY_TOLERANCE = 10000;
let preRequests = false;

export type DudaAuth = {
  type: 'bearer';
  authorization_code: string;
  refresh_token: string;
  expiration_date: number;
};

export type DudaAppConfig = {
  uuid: string,
  expirationTolerance?: number,
  auth: DudaAuth
}

class Apps extends Resource {
  base: any

  /** @internal */
  basePath = '/api/integrationhub/application';

  sites = new AppsSites(this);

  tokens = new AppsTokens(this);

  pages = new AppsPages(this);

  content = new AppsContent(this);

  manifest = new AppsManifest(this);

  accounts = new AppsAccounts(this);

  sitewidehtml = new AppsSWH(this);

  ecomm = new AppsEcomm(this);

  utils = Utils;

  ping = APIEndpoint<any, any>({
    method: 'get',
    path: '/health',
    defaults: {
      host: 'api.duda.co',
      basePath: '/api/integrationhub',
    },
  });

  private _appConfig?: DudaAppConfig

  get auth() {
    return this._appConfig?.auth;
  }

  get uuid() {
    return this._appConfig?.uuid
  }

  constructor(config: Config, events?: EventEmitter, appConfig?: DudaAppConfig) {
    super(config, events);
    this._appConfig = appConfig
  }

  /** @internal */
  buildRequest(req: RequestOptions, def: any, opts: any) {
    const token = this.base.auth?.authorization_code ?? opts.token;
    if (token) {
      req.headers!["X-DUDA-ACCESS-TOKEN"] = `Bearer ${token}`;
      // eslint-disable-next-line
      if (opts.token) delete opts.token;
    }

    // TODO: move to APIEndpoint as default behavior
    if (def.defaults.basePath) {
      req.path = def.defaults.basePath + def.path;
    }

    return req;
  }

  /** @internal */
  async preRequest() {
    const self: Apps = this.base;

    if (!self.auth || !self.uuid || preRequests) return;

    preRequests = true;
    const { expiration_date: expirationDate, refresh_token: refreshToken } = self.auth;

    if (Date.now() + (self._appConfig?.expirationTolerance ?? DEFAULT_EXPIRY_TOLERANCE) > expirationDate) {
      const newAuth = await this.base.tokens.refresh({ app_uuid: self.uuid, refresh_token: refreshToken })
      self._appConfig = { ...self._appConfig!, auth: newAuth }

      if (this.base.events) {
        this.base.events.emit('refresh', newAuth)
      }
      preRequests = false;
    }
  }
}

export default Apps;
export { Apps };
