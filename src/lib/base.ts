/* eslint-disable max-classes-per-file, no-underscore-dangle */

import EventEmitter from 'events';
import { RequestOptions } from './http';
import { APIEndpointDefinition } from './APIEndpoint';

class Config {
  host?: string;

  user?: string;

  pass?: string;

  __bearer?: string;

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
    this.__bearer = opts.__bearer;
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
  readonly events?: EventEmitter;

  /** @internal */
  basePath!: string;

  constructor(config: Config, events?: EventEmitter) {
    this.config = config;
    this.events = events;

    if (!this.basePath) this.basePath = '';

    Object.freeze(this.config);
  }

  /** @internal */
  buildRequest?(
    req: RequestOptions,
    def: APIEndpointDefinition<any, any>,
    opts: { [key: string]: any; }): RequestOptions;

  /** @internal */
  preRequest?(): void;
}

abstract class SubResource extends Resource {
  /** @internal */
  base: Resource;

  constructor(base: Resource) {
    super(base.config);
    this.base = base;
    this.basePath = base.basePath;
    this.buildRequest = base.buildRequest;
    this.preRequest = base.preRequest;
  }
}

export default Resource;
export { Config, Resource, SubResource };
