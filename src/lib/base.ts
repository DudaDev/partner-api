/* eslint-disable max-classes-per-file, no-underscore-dangle */

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
  readonly __config!: Config;

  __basePath!: string;

  constructor(config: Config) {
    this.__config = config;

    if (!this.__basePath) this.__basePath = '';

    Object.freeze(this.__config);
  }

  buildRequest?(
    req: RequestOptions,
    def: APIEndpointDefinition<any, any>,
    opts: { [key: string]: any; }): RequestOptions;
}

abstract class SubResource extends Resource {
  __base: Resource;

  constructor(base: Resource) {
    super(base.__config);
    this.__base = base;
    this.__basePath = base.__basePath;
    this.buildRequest = base.buildRequest;
  }
}

export default Resource;
export { Config, Resource, SubResource };
