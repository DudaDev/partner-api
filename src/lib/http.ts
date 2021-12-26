/* eslint-disable no-redeclare */

import * as https from 'https';
import log from './log';

import { checkMissingKeys } from './helpers';

let agent: https.Agent;

export interface RequestOptions extends https.RequestOptions {
  body?: any;
}

function tryJSONStringify(thing: any) {
  try {
    return JSON.stringify(thing);
  } catch (e) {
    return thing;
  }
}

async function makeRequest<Return>(req: RequestOptions): Promise<Return> {
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
    .replace(
      /"(user(name)?|pass(word)?|auth(orization)?)":"[^"]+"/gi,
      '"$1": [redacted]',
    );

  logger.debug(`full request details: req=${redactedRequest}`);

  const start = Date.now();

  return new Promise((resolve, reject) => {
    const request = https.request({
      method: req.method,

      host: req.host,

      agent: req.agent ?? agent,

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ data } as any);
        }
      });

      res.on('error', (e) => {
        logger.error(`error: message=${e}`);
        reject(e);
      });
    });

    if (req.body) {
      const bodyStr = JSON.stringify(req.body);
      logger.debug(`request body: body=${bodyStr}`);
      request.write(tryJSONStringify(req.body));
    }

    request.end();
  });
}

export default makeRequest;
export { makeRequest };
