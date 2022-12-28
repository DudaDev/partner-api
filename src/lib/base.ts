/* eslint-disable max-classes-per-file, no-underscore-dangle */

import { RequestOptions } from './http';
import { APIEndpointDefinition } from './APIEndpoint';

class Config {
  host?: string;

  user?: string;

  pass?: string;

  maxNetworkRetries?: number;

  timeout?: number;

  logger?: {
    (message?: any, ...optionalParams: any[]): void
  };

  logLevel?: 'info' | 'warning' | 'error' | 'debug';

  constructor(opts: any) {
    this.host = opts.host;
    this.user = opts.user;
    this.pass = opts.pass;
    this.logger = opts.logger;
    this.logLevel = opts.logLevel;
    this.maxNetworkRetries = opts.maxNetworkRetries;
    this.timeout = opts.timeout;
  }
}

abstract class Resource {
  /** @internal */
  readonly config!: Config;

  /** @internal */
  basePath!: string;

  constructor(config: Config) {
    this.config = config;

    if (!this.basePath) this.basePath = '';

    Object.freeze(this.config);
  }

  /** @internal */
  buildRequest?(
    req: RequestOptions,
    def: APIEndpointDefinition<any, any>,
    opts: { [key: string]: any; }): RequestOptions;
}

abstract class SubResource extends Resource {
  /** @internal */
  base: Resource;

  constructor(base: Resource) {
    super(base.config);
    this.base = base;
    this.basePath = base.basePath;
    this.buildRequest = base.buildRequest;
  }
}

export default Resource;
export { Config, Resource, SubResource };
