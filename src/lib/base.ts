/* eslint-disable max-classes-per-file */

import { RequestOptions } from './http';
import { APIEndpointDefinition } from './APIEndpoint';

class Config {
  host?: string;

  user?: string;

  pass?: string;

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
  }
}

abstract class Resource {
  basePath!: string;

  readonly config!: Config;

  constructor(config: Config) {
    this.config = config;

    if (!this.basePath) this.basePath = '';
  }

  buildRequest?(
    req: RequestOptions,
    def: APIEndpointDefinition<any, any>,
    opts: { [key: string]: any; }): RequestOptions;
}

abstract class SubResource extends Resource {
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
