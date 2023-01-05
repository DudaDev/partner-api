# @dudadev/partner-api

The `@dudadev/partner-api` library provides convenient access to Duda's public APIs from applications written in
server-side Javascript.

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Configuration](#configuration)
    1. [Initialize with config object](#initialize-with-config-object)
    2. [API Environments](#api-environments)
    3. [Network Retries](#network-retries)
5. [Request Overrides](#request-overrides)
6. [Responses](#responses)
    1. [Success](#success)
    2. [Errors](#errors)
7. [Debugging](#debugging)
8. [App Store](#app-store-api)
    1. [Authenticating requests](#authenticating-requests)
    2. [Handling different `api_endpoint` values](#handling-different-api_endpoint-values)
    3. [Utility functions](#utility-functions)
9. [More Information](#more-information)

## Requirements

Node v14 or higher.

## Installation

Install the package with:

```bash
npm install @dudadev/partner-api --save
# or
yarn add @dudadev/partner-api
```

## Usage

The package needs to be configured with your API credentials:

```typescript
const { Duda } = require('@dudadev/partner-api');

const duda = new Duda({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  env: Duda.Envs.direct,
});

duda.sites.get({ site_name: "a-site-name" })
  .then(site => console.log(site))
  .catch(error => console.error(error));
```

Or using ES modules and `async/await`:

```typescript
// async / await
(async function () {
  try {
    const site = await duda.sites.get({ site_name: "a-site-name" });
    console.log(site);
  } catch (error) {
    console.log(error.status, error.error);
    // handle error
  }
})();
```

## Configuration

### Initialize with config object

The package can be initialized with several options:

```typescript
const duda = new Duda({
  user: 'api-user',
  pass: 'api-pass',
  env: Duda.Envs.sandbox, // also, .direct, .eu
});
```

### API Environments

- `Duda.Envs.eu`: api.eu.duda.co
- `Duda.Envs.direct`: api.duda.co
- `Duda.Envs.sandbox`: api-sandbox.duda.co

### Request Timeout

The request timeout limit. The maximum number of milliseconds before a request is considered to be timed out. This will trigger a timeout event handler and reject the promise with an `ECONNRESET` error code. This option defaults to 10000ms.

```typescript
const duda = new Duda({
  ...,
  timeout: 1000
});
```

### Network Retries

Automatic network retries can be enabled with the maxNetworkRetries config option. This will retry requests n times with exponential backoff if they fail due to an intermittent network problem. It's recommended you also set the `timeout` config option when enabling retries. Keep in mind that the timeout config is related to the timeout of the request, it does not affect the timing of the exponential backoff.

```typescript
const duda = new Duda({
  ...,
  maxNetworkRetries: 2,
  timeout: 1000
});
```

## Request Overrides

You can override
the [http.RequestOptions](https://definitelytyped.org/docs/node--node/interfaces/https.requestoptions.html)
of any method on a per-request basis by passing a second object with custom options:

```typescript
const { Duda } = require('@dudadev/partner-api');

const duda = new Duda({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  env: Duda.Envs.direct,
});

duda.sites.get({ site_name: 'a-site-name' }, {
  host: 'api-special.duda.co',
  auth: 'another-username:another-password',
  headers: {
    'X-CUSTOM-HEADER': 'a-value',
  },
})
  .then((site) => console.log(site))
  .catch((error) => console.error(error))
```

## Responses

### Success

The library will attempt to parse all successful responses as JSON, and will return the raw value if it can't.

### Errors

The library will either throw (for promises) or return (for callbacks) the following payload after receiving a status
code >= 400:

```typescript
interface ErrorResponse<DudaError> {
  status: number;
  error: DudaError;
}
```

## Debugging

You can debug requests made by the library by setting the `DUDA_API_LOG_LEVEL` environment variable to one of the
following levels:

1. error: only shows fatal errors
2. warning: shows all errors and warnings
3. info: high-level debugging information
4. debug: verbose debugging information

The library will display logs that are >= `DUDA_API_LOG_LEVEL`. So, for example, setting the log level to warning (2)
would log all warnings (2) and errors (1).

The logger will attempt to redact any sensitive information before it logs using the following regular expressions:

- `/(user(name)?|pass(word)?|auth(orization)?)":"[^"]+/gi`
- `/(Bearer|Basic) [^"]+/gi`

### Example using `debug`

```bash
$ DUDA_API_LOG_LEVEL=debug node index.js
[debug] 8ce2a72d-d6b6-4fe8-bf39-45ebe99f7233 no http agent defined: received=undefined
[info] 8ce2a72d-d6b6-4fe8-bf39-45ebe99f7233 new request: method=get endpoint=api-sandbox.duda.co/api/sites/multiscreen/374f37ea1eff44e7966b2c685ded251a/pages
[debug] 8ce2a72d-d6b6-4fe8-bf39-45ebe99f7233 full request details: req={"headers":{},"method":"get","path":"/api/sites/multiscreen/374f37ea1eff44e7966b2c685ded251a/pages","auth": [redacted],"host":"api-sandbox.duda.co"}
[debug] 8ce2a72d-d6b6-4fe8-bf39-45ebe99f7233 data received: raw={"results":[{"uuid":"683340afe033436caab26cf8a548b1dd","title":"Home","path":"home","seo":{"no_index":false}}]}
[debug] 8ce2a72d-d6b6-4fe8-bf39-45ebe99f7233 request ended: status=200 time=0.51s
```

## App Store API

If you're an app developer, you can access the App Store API under `duda.appstore` after calling `new Duda(opts)`.

### Authenticating requests

API Endpoints protected by an `X-DUDA-ACCESS-TOKEN` expect method calls to include a `token` property set to the
`authorization_code` **without** `Bearer` included.

```typescript
duda.appstore.sites.get({
  site_name: 'a-site-name',
  token: 'authorization-code',
})
```

### Handling different `api_endpoint` values

You can use the [request override](#request-overrides) feature to set the host of a method call to the correct
`api_endpoint` for a particular site.

```typescript
function getSite(site: string) {
  const {
    site_name,
    auth,
    api_endpoint
  } = getInstallFromDB(site);

  return duda.appstore.sites.get({
    site_name: site_name,
    token: auth.authorization_code,
  }, {
    host: api_endpoint,
  })
}

getSite('a-site-name')
  .then((site) => console.log(site))
  .catch((err) => console.log(err.status, err.error))
```

### Utility functions

Included under `Duda.appstore` is `utils` which contains useful methods for validating webhooks & signatures.

```typescript
function validateWebook(req: YourRequestObject): boolean {
  // conform request object
  return duda.appstore.utils.validateWebook(process.env.SECRET_KEY, req.headers, req.body);
}

function validateSSO(req: YourRequestObject): boolean {
  // conform request object
  return duda.appstore.utils.validateSSOLink(process.env.SECRET_KEY, req.query);
}
```

## More Information

- [REST API Reference](https://developer.duda.co/reference#getting-started-with-the-duda-api)
