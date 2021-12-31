# @dudadev/api

The `@dudadev/api` library provides convenient access to Duda's public APIs from applications written in server-side
Javascript.

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Configuration](#configuration)
5. [Request Overrides](#request-overrides)
6. [Responses](#responses)
7. [Debugging](#debugging)
8. [App Store](#app-store-api)
9. [More Information](#more-information)

## Requirements

Node v12 or higher.

## Installation

Install the package with:

```bash
npm install @dudadev/api --save
# or
yarn add @dudadev/api
```

## Usage

The package needs to be configured with your API credentials:

```typescript
const { Duda } = require('@dudadev/api');

const duda = Duda.New({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  env: Duda.envs.direct,
});

duda.sites.get({ site_name: "a-site-name" }, function (err, site) {
  if (err) {
    console.log(err.status, err.error);
    // handle error
  }
  console.log(site);
})
```

Or using ES modules and `async/await`:

```typescript
// async / await
(async function () {
  try {
    const site = await duda.sites.get({ site_name: "a-site-name" });
    console.log(site);
  } catch (error) {
    // handle error
  }
})();
```

### Usage with TypeScript

Import Duda as the default import (not * as Duda) and call Duda.New(opts).

```typescript
import { Duda, Types } from '@dudadev/api';

const duda = Duda.New({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  env: Duda.envs.direct,
});

const switchTemplate = async (site: string, template: number) => {
  try {
    const opts: Types.GetSiteByNamePayload = { site_name: "a-site-name" };

    const site: Types.GetSiteByNameResponse = await duda.sites.get(opts);

    console.log(site.site_name);
  } catch (error) {
    // handle error
  }
}
```

### Using Promises

```typescript
// get a list of available templates
duda.templates.list()
  .then((templates) => {
    // create a new site from the first template in the returned array
    return duda.sites.create({
      template_id: templates[0].template_id
    })
      .then((site) => {
        return duda.accounts.permissions.grantSiteAccess({
          account_name: "account-name",
          site_name: site.site_name,
          permissions: ["EDIT"]
        })
          .then(() => {
            return duda.accounts.authentication.getSSOLink({
              account_name: "account-name",
              site_name: site.site_name,
              target: "EDITOR"
            })
          })
      })
  })
  .catch((err) => {
    // handle error
  });
```

## Configuration

### Initialize with config object

The package can be initialized with several options:

```typescript
const duda = Duda.New({
  user: 'api-user',
  pass: 'api-pass',
  env: Duda.envs.sandbox, // also, .direct, .eu
});
```

### API Environments

- Duda.envs.eu: api.eu.duda.co
- Duda.envs.direct: api.duda.co
- Duda.envs.sandbox: api-sandbox.duda.co

### Network Retries

Automatic network retries can be enabled with the maxNetworkRetries config option. This will retry requests n times with
exponential backoff if they fail due to an intermittent network problem.

```typescript
const duda = Duda.New({
  ...,
  maxNetworkRetries: 2
});
```

## Request Overrides

You can override the http.RequestOptions of any method on a per-request basis by passing a second object with custom
options:

```typescript
const { Duda } = require('@dudadev/api');

const duda = Duda.New({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  env: Duda.envs.direct,
});

duda.sites.get({ site_name: 'a-site-name' }, {
  host: 'api-special.duda.co',
  auth: 'another-username:another-password',
  headers: {
    'X-CUSTOM-HEADER': 'a-value',
  },
}, (err, site) => {
  if (err) console.log(err);
  console.log(site);
});
```

## Responses

### Success

The library will attempt to parse all successful responses as JSON, and will return the raw value if can't.

### Errors

The library will either throw (promises) or return (callbacks) the following payload after receiving a status code >=
400:

```typescript
interface ErrorResponse<T> {
  status: number;
  error: T;
}
```

### Example

```typescript
duda.sites.get({ site_name: 'no-site' }, (err, site) => {
  if (err) {
    console.log(err.status, err.error);
  }
  console.log(site.site_name);
})

duda.sites.get({ site_name: 'no-site' })
  .then((site) => console.log(site.site_name))
  .catch((err) => console.log(err.status, err.error));
```

## Debugging

You can debug requests made by the library by setting the `DUDA_API_LOG_LEVEL` environment variable to one of the
following levels:

- (1) error: only shows fatal errors
- (2) warning: shows all errors and warnings
- (3) info: high-level debugging information
- (4) debug: verbose debugging information

The library will display logs that are >= `DUDA_API_LOG_LEVEL`. So, for example, setting the log level to warning (2)
would log all warnings (2) and errors (1).

The logger will attempt to redact any sensitive information before it logs with the following regexs:

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
{
  results: [
    {
      uuid: '683340afe033436caab26cf8a548b1dd',
      title: 'Home',
      path: 'home',
      seo: [Object]
    }
  ]
}
```

## App Store API

If you're an app developer, you can access the App Store API under `duda.appstore` after calling `Duda.New(opts)`.

### Authenticating requests

API Endpoints protected by an `X-DUDA-ACCESS-TOKEN` expect method calls to include a `token` property set to the
`authorization_code` **without** `Bearer` included.

```typescript
duda.appstore.sites.get({
  site_name: 'a-site-name',
  token: 'authorization-code',
}, (err, site) => {
  if (err) console.log(err);
  console.log(site);
})
```

## More Information

- [REST API Reference](https://developer.duda.co/reference#getting-started-with-the-duda-api)
