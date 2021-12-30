/* eslint-disable no-redeclare */

import * as https from 'https';
import log from './log';

import { checkMissingKeys } from './helpers';

let agent: https.Agent;

interface RequestOptions extends https.RequestOptions {
  body?: any;
  headers?: {
    [key: string]: string;
  };
}

function tryJSONStringify(thing: any) {
  try {
    return JSON.stringify(thing);
  } catch (e) {
    console.log('err', e);
    return thing;
  }
}

interface ErrorResponse {
  status: number;
  error: any;
}

async function makeRequest<Return>(
  req: RequestOptions,
): Promise<[boolean, Return | ErrorResponse]> {
  const logger = log.trace();

  const missing = checkMissingKeys(req, ['env', 'method', 'path']);

  if (missing.length) {
    const reqStr = JSON.stringify(req);
    const missingStr = JSON.stringify(missing);

    logger.throw(`missing request properties: req=${reqStr} missing=${missingStr}}`);
  }

  if (!req.agent && !agent) {
    agent = new https.Agent({
      keepAlive: true,
    });

    logger.debug(`no http agent defined: received=${req.agent}`);
  }

  if (!req.auth) {
    logger.warning(`missing auth details: auth=${req.auth}`);
  }

  logger.info(`new request: method=${req.method} endpoint=${req.host}${req.path}`);

  const redactedRequest = JSON.stringify(req)
    .replace(/(Bearer|Basic) [^"]+/g, '[redacted]')
    .replace(
      /"(user(name)?|pass(word)?|auth(orization)?)":"[^"]+"/gi,
      '"$1": [redacted]',
    );

  logger.debug(`full request details: req=${redactedRequest}`);

  const start = Date.now();

  const body = tryJSONStringify(req.body);

  return new Promise((resolve, reject) => {
    const request = https.request({
      method: req.method,

      host: req.host,

      agent: req.agent ?? agent,

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(body && { 'Content-Length': body.length }),
        ...req.headers,
      },

      path: req.path,

      ...(req.auth && {
        auth: req.auth,
      }),
    }, (res) => {
      let data = '';

      res.on('data', (d) => {
        logger.debug(`data received: raw=${d}`);
        data += d;
      });

      res.on('end', () => {
        const time = ((Date.now() - start) / 1000).toFixed(2);

        logger.debug(`request ended: status=${res.statusCode} time=${time}s`);

        const error = {} as ErrorResponse;

        let reply: any;

        try {
          reply = JSON.parse(data);
        } catch (e) {
          reply = { data } as any;
        }

        if (res.statusCode! >= 400) {
          error.status = res.statusCode!;
          error.error = reply;
          resolve([true, error]);
        }

        resolve([false, reply]);
      });

      res.on('error', (e) => {
        logger.error(`error: message=${e}`);
        reject(e);
      });
    });

    if (req.body) {
      logger.debug(`request body: body=${body}`);
      request.write(body);
    }

    request.end();
  });
}

export default makeRequest;
export { makeRequest, RequestOptions, ErrorResponse };
