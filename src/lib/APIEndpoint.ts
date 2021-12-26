/* eslint-disable no-redeclare, default-param-last */

import * as https from 'https';
import makeRequest, { RequestOptions } from './http';

import {
  buildPath,
  buildQueryParams,
  Parameters,
  validateParams,
} from './helpers';

import Resource from './base';

interface APIEndpointDefinition<Opts, Response> {
  method: 'get' | 'put' | 'post' | 'delete';

  path: string;

  defaults?: {
    host?: string;
    port?: string;
  };

  headers?: any;

  bodyParams?: Parameters;
  queryParams?: Parameters;

  potentialErrors?: any;

  beforeRequest?: (opts: Opts) => Opts;
  afterRequest?: (opts: Response) => Response;
}

function APIEndpoint<Opts, Response>(def: APIEndpointDefinition<Opts, Response>) {
  function call(cb: { (res: Response): any; }): void;
  function call(): Promise<Response>;

  function call(opts: Opts): Promise<Response>;

  function call(opts: Opts, cb: { (res: Response): any; }): void;
  function call(opts: Opts, overrides?: RequestOptions): Promise<Response>;

  function call(opts: Opts, overrides: RequestOptions): Promise<Response>;
  function call(opts: Opts, overrides: RequestOptions, cb: { (res: Response): any; }): void;

  async function call<RequestOverrides extends https.RequestOptions & { body?: any }>(
    this: Resource,
    opts: Opts | { (res: Response): any; } = {} as any,
    overrides?: RequestOverrides | { (res: Response): any; },
    cb?: { (res: Response): any; },
  ): Promise<Response | null> {
    const params = { ...def.bodyParams, ...def.queryParams };

    validateParams(params, opts);

    const path = buildPath(def.path, opts);

    const query = def.queryParams && buildQueryParams(def.queryParams, opts);

    const body = def.beforeRequest?.(opts as Opts) ?? Object.keys(opts).length ? opts : null;

    const response = await makeRequest<Response>({
      method: def.method,
      path: query ? `${path}?${query}` : path,
      ...(this.config.user && this.config.pass && {
        auth: `${this.config.user}:${this.config.pass}`,
      }),
      ...(body && { body }),
      ...def.defaults,
      ...overrides,
    });

    const finalResponse = def.afterRequest?.(response) ?? response;

    if (typeof opts === 'function') {
      return (opts as any)(finalResponse);
    }

    if (overrides && typeof overrides === 'function') {
      return overrides(finalResponse);
    }

    if (cb && typeof cb === 'function') {
      return cb(finalResponse);
    }

    return finalResponse;
  }

  return call;
}

export default APIEndpoint;
export { APIEndpoint };
