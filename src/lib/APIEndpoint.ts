/* eslint-disable no-redeclare, default-param-last */

import * as https from 'https';

import makeRequest, { RequestOptions, ErrorResponse } from './http';

import {
  buildPath,
  Parameters,
  HeaderOptions,
  validateParams,
  validateHeaders,
  buildBodyParams,
  buildQueryParams,
} from './helpers';

import Resource from './base';

interface APIEndpointDefinition<Opts, Response> {
  method: 'get' | 'put' | 'post' | 'delete';

  path: string;

  defaults?: {
    host?: string;
    port?: string;
    headers?: any;
    basePath?: string;
  };

  bodyParams?: Parameters;
  queryParams?: Parameters;
  headerOptions?: HeaderOptions;

  potentialErrors?: any;

  beforeRequest?: (opts: Opts) => Partial<Opts> | Array<any>;
  afterRequest?: (err: ErrorResponse | null, opts: Response) => Response;
}

function APIEndpoint<Opts, Response>(def: APIEndpointDefinition<Opts, Response>) {
  function call(cb: { (err: ErrorResponse, res: Response): any; }): void;

  function call(): Promise<Response>;

  function call(opts: Opts, cb: { (err: ErrorResponse, res: Response): any; }): void;

  function call(opts: Opts): Promise<Response>;

  function call(opts: Opts, overrides?: RequestOptions): Promise<Response>;

  function call(opts: Opts, overrides: RequestOptions, cb: {
    (err: ErrorResponse, res: Response): any;
  }): void;

  async function call<RequestOverrides extends https.RequestOptions & { body?: any }>(
    this: Resource,
    opts: Opts | { (err: ErrorResponse, res: Response): any; } = {} as any,
    overrides?: RequestOverrides | { (err: ErrorResponse, res: Response): any; },
    cb?: { (err: ErrorResponse, res: Response): any; },
  ): Promise<Response | ErrorResponse | null> {
    const params = { ...def.bodyParams, ...def.queryParams };

    validateParams(params, opts);

    const path = buildPath(`${this.basePath}${def.path}`, opts);

    const query = def.queryParams && buildQueryParams(def.queryParams, opts);

    const optz = def.bodyParams ? buildBodyParams(def.bodyParams, opts) : opts;

    const body = def.beforeRequest?.(optz as Opts) ?? (Object.keys(optz).length ? optz : null);

    const request = {
      headers: {},
      method: def.method,
      path: query ? `${path}?${query}` : path,
      ...(this.config.user && this.config.pass && {
        auth: `${this.config.user}:${this.config.pass}`,
      }),
      ...def.defaults,
      ...(body && { body }),
      ...(this.config.host && { host: this.config.host }),
      ...(typeof overrides !== 'function' && overrides),
    };

    const builtRequest = this.buildRequest?.(request, def, opts);

    validateHeaders(builtRequest?.headers ?? request.headers, def.headerOptions);

    const [error, response] = await makeRequest<Response>(builtRequest ?? request);

    const finalResponse = def.afterRequest?.(error, response) ?? response;

    if (typeof opts === 'function') {
      return (opts as any)(error, finalResponse);
    }

    if (overrides && typeof overrides === 'function') {
      return (overrides as any)(error, finalResponse);
    }

    if (cb && typeof cb === 'function') {
      return (cb as any)(error, finalResponse);
    }

    if (error) {
      throw error;
    }

    return finalResponse;
  }

  return call;
}

export default APIEndpoint;
export { APIEndpoint, APIEndpointDefinition };
