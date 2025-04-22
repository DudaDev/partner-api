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
   4. [Configuring at instantiation (beta)](#configuring-the-duda-instance-at-instantiation-for-app-store-requests-beta)
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
const { Duda } = require("@dudadev/partner-api");

const duda = new Duda({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  env: Duda.Envs.direct,
});

duda.sites
  .get({ site_name: "a-site-name" })
  .then((site) => console.log(site))
  .catch((error) => console.error(error));
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
  user: "api-user",
  pass: "api-pass",
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
const { Duda } = require("@dudadev/partner-api");

const duda = new Duda({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  env: Duda.Envs.direct,
});

duda.sites
  .get(
    { site_name: "a-site-name" },
    {
      host: "api-special.duda.co",
      auth: "another-username:another-password",
      headers: {
        "X-CUSTOM-HEADER": "a-value",
      },
    },
  )
  .then((site) => console.log(site))
  .catch((error) => console.error(error));
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
  site_name: "a-site-name",
  token: "authorization-code",
});
```

### Handling different `api_endpoint` values

You can use the [request override](#request-overrides) feature to set the host of a method call to the correct
`api_endpoint` for a particular site.

```typescript
function getSite(site: string) {
  const { site_name, auth, api_endpoint } = getInstallFromDB(site);

  return duda.appstore.sites.get(
    {
      site_name: site_name,
      token: auth.authorization_code,
    },
    {
      host: api_endpoint,
    },
  );
}

getSite("a-site-name")
  .then((site) => console.log(site))
  .catch((err) => console.log(err.status, err.error));
```

### Utility functions

Included under `Duda.appstore` is `utils` which contains useful methods for validating webhooks & signatures.

```typescript
function validateWebook(req: YourRequestObject): boolean {
  // conform request object
  return duda.appstore.utils.validateWebook(
    process.env.SECRET_KEY,
    req.headers,
    req.body,
  );
}

function validateSSO(req: YourRequestObject): boolean {
  // conform request object
  return duda.appstore.utils.validateSSOLink(process.env.SECRET_KEY, req.query);
}
```

### Configuring the Duda instance at instantiation for App Store requests (beta)

As of 2.8.0 you can configure an instance of the Duda class with an App Store configuration, negating the need to pass your token on each request. This configuration will also automatically handle refreshing your token if the expiration date has passed. _Note: You are still responsible for saving your new authorization and expiration date into your database._

```typescript
const duda = new Duda(
  {
    user: "testing",
    pass: "testing",
    env: Duda.Envs.direct,
  },
  {
    auth: appStoreAuthObject,
    uuid: appUuid,
  },
);
```

The optional second argument contains the UUID of your app (this is provided by Duda when starting your app build), and the entire auth object you receive when an app is [installed](https://developer.duda.co/docs/app-store-webhooks#install) onto a site.

Once configured in this fashion, any requests to methods under the `appstore` namespace will no longer require a token.

```typescript
return duda.appstore.sites.get(
  {
    site_name: site_name,
  },
  {
    host: api_endpoint,
  },
);
```

A second benefit of this configuration is that the object will check the `expiration_date` on the supplied auth object before executing your App Store request. If the date has passed, it will call the [token refresh endpoint](https://developer.duda.co/reference/app-create-access-token) and obtain a new auth object that contains an updated `authorization_code`.

After aquiring a new code. The object will emit an event containing the entire auth object, which you should save to your db.

```typescript
const duda = new Duda(
  {
    user: "testing",
    pass: "testing",
    env: Duda.Envs.direct,
  },
  {
    auth: appStoreAuthObject,
    uuid: appUuid,
  },
);

duda.events.on("refresh", (auth) => {
  // save the updated auth object with the rest of the app install data.
});
```

This feature is currently in beta, if you experience any issues while implementing the new configuration, please [open an issue](https://github.com/DudaDev/partner-api/issues).

# Sites

## List Sites

[List Sites Reference](https://developer.duda.co/reference/sites-list-sites)

### Request

`GET https://api.duda.co/api/sites/multiscreen`

```typescript
duda.sites.list();
```

## Get Site

[Get Site Reference](https://developer.duda.co/reference/sites-get-site)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}`

```typescript
duda.sites.get({ site_name: site_name });
```

## Get Site by External ID

[Get Site by External ID Reference](https://developer.duda.co/reference/sites-get-sites-by-external-id)

### Request

`GET https://api.duda.co/api/sites/multiscreen/byexternalid/{external_uid}`

```typescript
duda.sites.getByExternalID({ external_uid: external_uid });
```

## Create Site

[Create Site Reference](https://developer.duda.co/reference/sites-create-site)

### Request

`POST https://api.duda.co/api/sites/multiscreen/create`

```typescript
duda.sites.create({ template_id: template_id });
```

## Update Site

[Update Site Reference](https://developer.duda.co/reference/sites-update-site)

### Request

`POST https://api.duda.co/api/sites/multiscreen/update/{site_name}`

```typescript
duda.sites.update({ site_name: site_name });
```

## Duplicate Site

[Duplicate Site Reference](https://developer.duda.co/reference/sites-duplicate-site)

### Request

`POST https://api.duda.co/api/sites/multiscreen/duplicate/{site_name}`

```typescript
duda.sites.duplicate({
  site_name: site_name,
  new_default_domain_prefix: new_default_domain_prefix,
});
```

## Publish Site

[Publish Site Reference](https://developer.duda.co/reference/sites-publish-site)

### Request

`POST https://api.duda.co/api/sites/multiscreen/publish/{site_name}`

```typescript
duda.sites.publish({ site_name: site_name });
```

## Unpublish Site

[Unpublish Site Reference](https://developer.duda.co/reference/sites-unpublish-site)

### Request

`POST https://api.duda.co/api/sites/multiscreen/unpublish/{site_name}`

```typescript
duda.sites.unpublish({ site_name: site_name });
```

## Reset Site

[Reset Site Reference](https://developer.duda.co/reference/sites-reset-site)

### Request

`POST https://api.duda.co/api/sites/multiscreen/reset/{site_name}`

```typescript
duda.sites.reset({ site_name: site_name, template_id: template_id });
```

## Switch Template

[Switch Template Reference](https://developer.duda.co/reference/sites-switch-template)

### Request

`POST https://api.duda.co/api/sites/multiscreen/switchTemplate/{site_name}`

```typescript
duda.sites.switchTemplate({ site_name: site_name, template_id: template_id });
```

## Delete Site

[Delete Site Reference](https://developer.duda.co/reference/sites-delete-site)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}`

```typescript
duda.sites.delete({ site_name: site_name });
```

## Get Site Theme

[Get Site Theme Reference](https://developer.duda.co/reference/sites-get-site-theme)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/theme`

```typescript
duda.sites.theme.get({ site_name: site_name });
```

## Update Site Theme

[Update Site Theme Reference](https://developer.duda.co/reference/sites-update-site-theme)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/theme`

```typescript
duda.sites.theme.update({ site_name: site_name });
```

# Templates

## List Templates

[List Templates Reference](https://developer.duda.co/reference/templates-list-templates)

### Request

`GET https://api.duda.co/api/sites/multiscreen/templates`

```typescript
duda.templates.list();
```

## Get Template

[Get Template Reference](https://developer.duda.co/reference/templates-get-template)

### Request

`GET https://api.duda.co/api/sites/multiscreen/templates/{template_id}`

```typescript
duda.templates.get({ template_id: template_id });
```

## Update Template

[Update Template Reference](https://developer.duda.co/reference/templates-update-template)

### Request

`POST https://api.duda.co/api/sites/multiscreen/templates/{template_id}`

```typescript
duda.templates.update({ template_id: template_id });
```

## Create From Site

[Create From Site Reference](https://developer.duda.co/reference/templates-create-from-site)

### Request

`POST https://api.duda.co/api/sites/multiscreen/templates/fromsite`

```typescript
duda.templates.createFromSite({ site_name: site_name });
```

## Create From Template

[Create From Template Reference](https://developer.duda.co/reference/templates-create-from-template)

### Request

`POST https://api.duda.co/api/sites/multiscreen/templates/fromtemplate`

```typescript
duda.templates.createFromTemplate({ template_id: template_id });
```

## Delete Template

[Delete Template Reference](https://developer.duda.co/reference/templates-delete-template)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/templates/{template_id}`

```typescript
duda.templates.delete({ template_id: template_id });
```

# Pages v2

## List Pages

[List Pages Reference](https://developer.duda.co/reference/pages-v2-list-pages)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/pages`

```typescript
duda.pages.v2.list({ site_name: site_name });
```

## Get Page

[Get Page Reference](https://developer.duda.co/reference/pages-v2-get-page)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/pages/{page_uuid}`

```typescript
duda.pages.v2.get({ site_name: site_name, page_uuid: page_uuid });
```

## Update Page

[Update Page Reference](https://developer.duda.co/reference/pages-v2-update-page)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/pages/{page_uuid}`

```typescript
duda.pages.v2.update({ site_name: site_name, page_uuid: page_uuid });
```

## Create Page

[Create Page Reference](https://developer.duda.co/reference/pages-v2-create-page)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/pages`

```typescript
duda.pages.v2.create({ site_name: site_name });
```

## Duplicate Page

[Duplicate Page Reference](https://developer.duda.co/reference/pages-v2-duplicate-page)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/pages/{page_uuid}/duplicate`

```typescript
duda.pages.v2.duplicate({ site_name: site_name, page_uuid: page_uuid });
```

## Delete Page

[Delete Page Reference](https://developer.duda.co/reference/pages-v2-delete-page)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/pages/{page_uuid}`

```typescript
duda.pages.v2.delete({ site_name: site_name, page_uuid: page_uuid });
```

# Page Elements

## List Page Elements

[List Page Elements Reference](https://developer.duda.co/reference/page-elements-list-page-elements)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/pages/{page_uuid}/elements`

```typescript
duda.pages.elements.list({ site_name: site_name, page_uuid: page_uuid });
```

## Create Page Element

[Create Page Element Reference](https://developer.duda.co/reference/page-elements-create-page-element)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/pages/{page_uuid}/elements`

```typescript
duda.pages.elements.create({ site_name: site_name, page_uuid: page_uuid });
```

## Update Page Element

[Update Page Element Reference](https://developer.duda.co/reference/page-elements-update-page-element)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/pages/{page_uuid}/elements/{element_id}`

```typescript
duda.pages.elements.update({
  site_name: site_name,
  page_uuid: page_uuid,
  element_id: element_id,
});
```

## Delete Page Element

[Delete Page Element Reference](https://developer.duda.co/reference/page-elements-delete-page-element)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/pages/{page_uuid}/elements/{element_id}`

```typescript
duda.pages.elements.delete({
  site_name: site_name,
  page_uuid: page_uuid,
  element_id: element_id,
});
```

# Sections

## List Sections

[List Sections Reference](https://developer.duda.co/reference/sections-list-sections)

### Request

`GET https://api.duda.co/api/sections`

```typescript
duda.sections.list();
```

## Get Section

[Get Section Reference](https://developer.duda.co/reference/sections-get-section)

### Request

`GET https://api.duda.co/api/sections/{section_uuid}`

```typescript
duda.sections.get({ section_uuid: section_uuid });
```

# Navigation

## List Navigation

[List Navigation Reference](https://developer.duda.co/reference/navigation-list-navigation)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/navigation`

```typescript
duda.navigation.list({ site_name: site_name });
```

## Get Navigation By Language

[Get Navigation By Language Reference](https://developer.duda.co/reference/navigation-get-navigation-by-language)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/navigation/{lang}`

```typescript
duda.navigation.getByLang({ site_name: site_name, lang: lang });
```

## Create Navigation

[Create Navigation Reference](https://developer.duda.co/reference/navigation-create-navigation)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/navigation/{lang}/items`

```typescript
duda.navigation.create({ site_name: site_name, lang: lang });
```

## Update Navigation

[Update Navigation Reference](https://developer.duda.co/reference/navigation-update-navigation)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/navigation/{lang}/items/{navigation_id}`

```typescript
duda.navigation.update({
  site_name: site_name,
  lang: lang,
  navigation_id: navigation_id,
});
```

# Blog

## Import Blog

[Import Blog Reference](https://developer.duda.co/reference/import-blog)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/blog/import`

```typescript
duda.blog.import({ site_name: site_name });
```

## Import Blog Post

[Import Blog Post Reference](https://developer.duda.co/reference/import-blog-post)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/blog/posts/import`

```typescript
duda.blog.importPost({ site_name: site_name });
```

## Publish Blog Post

[Publish Blog Post Reference](https://developer.duda.co/reference/blog-publish-blog-post)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/blog/posts/{post_id}/publish`

```typescript
duda.blog.publish({ site_name: site_name, post_id: post_id });
```

## Unpublish Blog Post

[Unpublish Blog Post Reference](https://developer.duda.co/reference/blog-unpublish-blog-post)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/blog/posts/{post_id}/unpublish`

```typescript
duda.blog.unpublish({ site_name: site_name, post_id: post_id });
```

## Update Blog Post

[Update Blog Post Reference](https://developer.duda.co/reference/blog-update-blog-post)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/blog/posts/{post_id}`

```typescript
duda.blog.update({ site_name: site_name, post_id: post_id });
```

## List Blog Posts

[List Blog Posts Reference](https://developer.duda.co/reference/blog-list-blog-posts)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/blog/posts`

```typescript
duda.blog.list({ site_name: site_name });
```

## Get Blog Post

[Get Blog Post Reference](https://developer.duda.co/reference/blog-get-blog-post)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/blog/posts/{post_id}`

```typescript
duda.blog.get({ site_name: site_name, post_id: post_id });
```

## Delete Blog Post

[Delete Blog Post Reference](https://developer.duda.co/reference/blog-delete-blog-post)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/blog/posts/{post_id}`

```typescript
duda.blog.deletePost({ site_name: site_name, post_id: post_id });
```

## Delete Blog

[Delete Blog Reference](https://developer.duda.co/reference/blog-delete-blog)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/blog`

```typescript
duda.blog.delete({ site_name: site_name });
```

# eComm

## Get Settings

[Get Settings Reference](https://developer.duda.co/reference/get-settings)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce`

```typescript
duda.ecomm.get({ site_name: site_name });
```

## Update Settings

[Update Settings Reference](https://developer.duda.co/reference/ecommerce-update-settings)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce`

```typescript
duda.ecomm.update({ site_name: site_name });
```

# eComm Store

## Get Store

[Get Store Reference](https://developer.duda.co/reference/get-store)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/store`

```typescript
duda.ecomm.store.get({ site_name: site_name });
```

## Create Store

[Create Store Reference](https://developer.duda.co/reference/create-store)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/store`

```typescript
duda.ecomm.store.create({ site_name: site_name });
```

## Delete Store

[Delete Store Reference](https://developer.duda.co/reference/delete-store)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/store`

```typescript
duda.ecomm.store.delete({ site_name: site_name });
```

# eComm Carts

## List Carts

[List Carts Reference](https://developer.duda.co/reference/ecommerce-list-carts)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/carts`

```typescript
duda.ecomm.carts.list({ site_name: site_name });
```

## Get Cart

[Get Cart Reference](https://developer.duda.co/reference/ecommerce-get-cart)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/carts/{cart_id}`

```typescript
duda.ecomm.carts.get({ site_name: site_name, cart_id: cart_id });
```

# eComm Tax Groups

## List Tax Groups

[List Tax Groups Reference](https://developer.duda.co/reference/ecomm-list-tax-groups)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-groups`

```typescript
duda.ecomm.groups.list({ site_name: site_name });
```

## Get Tax Group

[Get Tax Group Reference](https://developer.duda.co/reference/ecomm-get-tax-group)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-groups/{group_id}`

```typescript
duda.ecomm.groups.get({ site_name: site_name, group_id: group_id });
```

## Create Tax Group

[Create Tax Group Reference](https://developer.duda.co/reference/ecomm-create-tax-group)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-groups`

```typescript
duda.ecomm.groups.create({ site_name: site_name });
```

## Update Tax Group

[Update Tax Group Reference](https://developer.duda.co/reference/ecomm-update-tax-group)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-groups/{group_id}`

```typescript
duda.ecomm.groups.update({ site_name: site_name, group_id: group_id });
```

## Delete Tax Group

[Delete Tax Group Reference](https://developer.duda.co/reference/ecomm-delete-tax-group)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-groups/{group_id}`

```typescript
duda.ecomm.groups.delete({ site_name: site_name, group_id: group_id });
```

# eComm Tax Zones

## List Tax Zones

[List Tax Zones Reference](https://developer.duda.co/reference/list-tax-zones)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones`

```typescript
duda.ecomm.zones.list({ site_name: site_name });
```

## Get Tax Zone

[Get Tax Zone Reference](https://developer.duda.co/reference/ecomm-get-tax-zone)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}`

```typescript
duda.ecomm.zones.get({ site_name: site_name, zone_id: zone_id });
```

## Create Tax Zone

[Create Tax Zone Reference](https://developer.duda.co/reference/ecomm-create-tax-zone)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones`

```typescript
duda.ecomm.zones.create({ site_name: site_name });
```

## Update Tax Zone

[Update Tax Zone Reference](https://developer.duda.co/reference/ecomm-update-tax-zone)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}`

```typescript
duda.ecomm.zones.update({ site_name: site_name, zone_id: zone_id });
```

## Delete Tax Zone

[Delete Tax Zone Reference](https://developer.duda.co/reference/ecomm-delete-tax-zone)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}`

```typescript
duda.ecomm.zones.delete({ site_name: site_name, zone_id: zone_id });
```

## List Tax Zone Rates

[List Tax Zone Rates  Reference](https://developer.duda.co/reference/ecomm-list-tax-zone-rates)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates`

```typescript
duda.ecomm.zones.listRate({ site_name: site_name, zone_ide: zone_id });
```

## Get Tax Zone Rate

[Get Tax Zone Rate Reference](https://developer.duda.co/reference/ecomm-get-tax-zone-rate)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates/{rate_id}`

```typescript
duda.ecomm.zones.getRate({ site_name: site_name, zone_id: zone_id, rate_id: rate_id });
```

## Create Tax Zone Rate

[Create Tax Zone Rate Reference](https://developer.duda.co/reference/ecomm-create-tax-zone-rate)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates`

```typescript
duda.ecomm.zones.createRate({ site_name: site_name, zone_id: zone_id });
```

## Update Tax Zone Rate

[Update Tax Zone Rate Reference](https://developer.duda.co/reference/ecomm-update-tax-zone-rate)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates/{rate_id}`

```typescript
duda.ecomm.zones.updateRate({ site_name: site_name, zone_id: zone_id, rate_id: rate_id });
```

## Delete Tax Zone Rate

[Delete Tax Zone Rate Reference](https://developer.duda.co/reference/delete-tax-zone-rate)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/tax-zones/{zone_id}/rates/{rate_id}`

```typescript
duda.ecomm.zones.deleteRate({ site_name: site_name, zone_id: zone_id, rate_id: rate_id });
```

# eComm Orders

## List Orders

[List Orders Reference](https://developer.duda.co/reference/ecommerce-list-orders)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/orders`

```typescript
duda.ecomm.orders.list({ site_name: site_name });
```

## Get Order

[Get Order Reference](https://developer.duda.co/reference/ecommerce-get-order)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}`

```typescript
duda.ecomm.orders.get({ site_name: site_name, order_id: order_id });
```

## Create Order

[Create Order Reference](https://developer.duda.co/reference/create-external-order)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/orders`

```typescript
duda.ecomm.orders.post({ site_name: site_name });
```

## Update Order

[Update Order Reference](https://developer.duda.co/reference/update-order)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}`

```typescript
duda.ecomm.orders.update({ site_name: site_name, order_id: order_id });
```

## List Refunds

[List Refunds Reference](https://developer.duda.co/reference/list-refunds)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/refunds`

```typescript
duda.ecomm.orders.listRefunds({ site_name: site_name, order_id: order_id });
```

## Get Refund

[Get Refund Reference](https://developer.duda.co/reference/get-refund)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/orders/{order_id}/refunds/{refund_id}`

```typescript
duda.ecomm.orders.getRefund({
  site_name: site_name,
  order_id: order_id,
  refund_id: refund_id,
});
```

# eComm Payment Gateways

## List Payment Gateways

[List Payment Gateways Reference](https://developer.duda.co/reference/ecommerce-list-payment-gateways)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways`

```typescript
duda.ecomm.gateways.list({ site_name: site_name });
```

## Get Payment Gateway

[Get Payment Gateway Reference](https://developer.duda.co/reference/ecommerce-get-payment-gateway)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways/{gateway_id}`

```typescript
duda.ecomm.gateways.get({ site_name: site_name, gateway_id: gateway_id });
```

## Create Payment Gateway

[Create Payment Gateway Reference](https://developer.duda.co/reference/ecommerce-create-payment-gateway)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways`

```typescript
duda.ecomm.gateways.create({
  site_name: site_name,
  live_payment_methods_url: live_payment_methods_url,
});
```

## Update Payment Gateway

[Update Payment Gateway Reference](https://developer.duda.co/reference/ecommerce-update-payment-gateway)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways/{gateway_id}`

```typescript
duda.ecomm.gateways.update({
  site_name: site_name,
  gateway_id: gateway_id,
  live_payment_methods_url: live_payment_methods_url,
});
```

## Delete Payment Gateway

[Delete Payment Gateway Reference](https://developer.duda.co/reference/ecommerce-delete-payment-gateway)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-gateways/{gateway_id}`

```typescript
duda.ecomm.gateways.delete({ site_name: site_name, gateway_id: gateway_id });
```

# eComm Payments

## Get Payment Session

[Get Payment Session Reference](https://developer.duda.co/reference/ecommerce-get-payment-session)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-sessions/{session_id}`

```typescript
duda.ecomm.payments.get({ site_name: site_name, session_id: session_id });
```

## Confirm Payment

[Confirm Payment Reference](https://developer.duda.co/reference/ecommerce-confirm-payment)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/payment-sessions/{session_id}/confirm`

```typescript
duda.ecomm.payments.confirm({
  site_name: site_name,
  session_id: session_id,
  state: state,
});
```

# eComm Categories

## Get Categories

[Get Categories Reference](https://developer.duda.co/reference/ecommerce-get-categories)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories`

```typescript
duda.ecomm.categories.list({ site_name: site_name });
```

## Get Category

[Get Category Reference](https://developer.duda.co/reference/ecommerce-get-category)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories/{category_id}`

```typescript
duda.ecomm.categories.get({ site_name: site_name, category_id: category_id });
```

## Create Category

[Create Category Reference](https://developer.duda.co/reference/ecommerce-create-category)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories`

```typescript
duda.ecomm.categories.create({ site_name: site_name });
```

## Update Category

[Update Category Reference](https://developer.duda.co/reference/ecommerce-update-category)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories/{category_id}`

```typescript
duda.ecomm.categories.update({
  site_name: site_name,
  category_id: category_id,
});
```

## Delete Category

[Delete Category Reference](https://developer.duda.co/reference/ecommerce-delete-category)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/categories/{category_id}`

```typescript
duda.ecomm.categories.delete({
  site_name: site_name,
  category_id: category_id,
});
```

# eComm Shipping Providers

## List Shipping Providers

[List Shipping Providers Reference](https://developer.duda.co/reference/ecommerce-list-shipping-providers)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/shipping-providers`

```typescript
duda.ecomm.shipping.list({ site_name: site_name });
```

## Get Shipping Provider

[Get Shipping Provider Reference](https://developer.duda.co/reference/ecommerce-get-shipping-provider)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers/{id}`

```typescript
duda.ecomm.shipping.get({ site_name: site_name, id: id });
```

## Create Shipping Provider

[Create Shipping Provider Reference](https://developer.duda.co/reference/ecommerce-create-shipping-provider)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers`

```typescript
duda.ecomm.shipping.create({
  site_name: site_name,
  live_shipping_rates_url: live_shipping_rates_url,
});
```

## Update Shipping Provider

[Update Shipping Provider Reference](https://developer.duda.co/reference/ecommerce-update-shipping-provider)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers/{id}`

```typescript
duda.ecomm.shipping.update({ site_name: site_name, id: id });
```

## Delete Shipping Provider

[Delete Shipping Provider Reference](https://developer.duda.co/reference/ecommerce-delete-shipping-provider)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{siteAlias}/ecommerce/shipping-providers/{id}`

```typescript
duda.ecomm.shipping.delete({ site_name: site_name, id: id });
```

# eComm Products

## List Products

[List Products Reference](https://developer.duda.co/reference/ecommerce-list-products)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/products`

```typescript
duda.ecomm.products.list({ site_name: site_name });
```

## Get Product

[Get Product Reference](https://developer.duda.co/reference/ecommerce-get-product)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}`

```typescript
duda.ecomm.products.get({ site_name: site_name, product_id: product_id });
```

## Create Product

[Create Product Reference](https://developer.duda.co/reference/ecommerce-create-product)

### Request

`CREATE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/products`

```typescript
duda.ecomm.products.create({ site_name: site_name });
```

## Update Product

[Update Product Reference](https://developer.duda.co/reference/ecommerce-update-product)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}`

```typescript
duda.ecomm.products.update({ site_name: site_name, product_id: product_id });
```

## Delete Product

[Delete Product Reference](https://developer.duda.co/reference/ecommerce-delete-product)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}`

```typescript
duda.ecomm.products.delete({ site_name: site_name, product_id: product_id });
```

# eComm Variations

## Get Product Variation

[Get Product Variation Reference](https://developer.duda.co/reference/ecommerce-get-product-variation)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}/variations/{variation_id}`

```typescript
duda.ecomm.variations.get({
  site_name: site_name,
  product_id: product_id,
  variation_id: variation_id,
});
```

## Update Product Variation

[Update Product Variation Reference](https://developer.duda.co/reference/ecommerce-update-product-variation)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/products/{product_id}/variations/{variation_id}`

```typescript
duda.ecomm.variations.update({
  site_name: site_name,
  product_id: product_id,
  variation_id: variation_id,
});
```

# eComm Product Options

## List Product Options

[List Product Options Reference](https://developer.duda.co/reference/ecommerce-list-product-options)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/options`

```typescript
duda.ecomm.options.list({ site_name: site_name });
```

## Get Product Option

[Get Product Option Reference](https://developer.duda.co/reference/ecommerce-get-product-option)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}`

```typescript
duda.ecomm.options.get({ site_name: site_name, option_id: option_id });
```

## Create Product Option

[Create Product Option Reference](https://developer.duda.co/reference/ecommerce-create-product-option)

### Request

`CREATE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/options`

```typescript
duda.ecomm.options.create({
  site_name: site_name,
  choices: choices,
  name: name,
});
```

## Update Product Option

[Update Product Option Reference](https://developer.duda.co/reference/ecommerce-update-product-option)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}`

```typescript
duda.ecomm.options.update({
  site_name: site_name,
  option_id: option_id,
  name: name,
});
```

## Delete Product Option

[Delete Product Option Reference](https://developer.duda.co/reference/ecommerce-delete-product-option)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}`

```typescript
duda.ecomm.options.delete({ site_name: site_name, option_id: option_id });
```

## Create Product Option Choice

[Create Product Option Choice Reference](https://developer.duda.co/reference/ecommerce-create-product-option-choice)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}/choices`

```typescript
duda.ecomm.options.createChoice({
  site_name: site_name,
  option_id: option_id,
  value: value,
});
```

## Update Product Option Choice

[Update Product Option Choice Reference](https://developer.duda.co/reference/ecommerce-update-product-option-choice)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}`

```typescript
duda.ecomm.options.createChoice({
  site_name: site_name,
  option_id: option_id,
  choice_id: choice_id,
  value: value,
});
```

## Delete Product Option Choice

[Delete Product Option Choice Reference](https://developer.duda.co/reference/ecommerce-delete-product-option-choice)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}`

```typescript
duda.ecomm.options.createChoice({
  site_name: site_name,
  option_id: option_id,
  choice_id: choice_id,
});
```

# URL Rules

## List Rules

[List Rules Reference](https://developer.duda.co/reference/url-rules-list-rules)

### Request

`GET https://api.duda.co/api/sites/multiscreen/site/{site_name}/urlrules`

```typescript
duda.urlRules.list({ site_name: site_name });
```

## Get Rule

[Get Rule Reference](https://developer.duda.co/reference/url-rules-get-rule)

### Request

`GET https://api.duda.co/api/sites/multiscreen/site/{site_name}/urlrules/{id}`

```typescript
duda.urlRules.get({ site_name: site_name, id: id });
```

## Create Rule

[Create Rule Reference](https://developer.duda.co/reference/url-rules-create-rule)

### Request

`POST https://api.duda.co/api/sites/multiscreen/site/{site_name}/urlrules`

```typescript
duda.urlRules.create({ site_name: site_name });
```

## Update Rule

[Update Rule Reference](https://developer.duda.co/reference/url-rules-update-rule)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/site/{site_name}/urlrules/{id}`

```typescript
duda.urlRules.update({ site_name: site_name, id: id });
```

## Delete Rule

[Delete Rule Reference](https://developer.duda.co/reference/url-rules-delete-rule)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/site/{site_name}/urlrules/{id}`

```typescript
duda.urlRules.update({ site_name: site_name, id: id });
```

# Site Plans

## List Site Plans

[List Site Plans Reference](https://developer.duda.co/reference/site-plans-list-site-plans)

### Request

`GET https://api.duda.co/api/sites/multiscreen/plans`

```typescript
duda.plans.list();
```

## Get Site Plan

[Get Site Plan Reference](https://developer.duda.co/reference/site-plans-get-site-plan)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/plan`

```typescript
duda.plans.get({ site_name: site_name });
```

## Update Site Plan

[Update Site Plan Reference](https://developer.duda.co/reference/site-plans-update-site-plan)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/plan/{plan_id}`

```typescript
duda.plans.update({ site_name: site_name, plan_id: plan_id });
```

# Accounts

## Get Account

[Get Account Reference](https://developer.duda.co/reference/accounts-get-account)

### Request

`GET https://api.duda.co/api/accounts/{account_name}`

```typescript
duda.accounts.get({ account_name: account_name });
```

## Create Account

[Create Account Reference](https://developer.duda.co/reference/accounts-create-account)

### Request

`POST https://api.duda.co/api/accounts/create`

```typescript
duda.accounts.create({ account_name: account_name });
```

## Update Account

[Update Account Reference](https://developer.duda.co/reference/accounts-update-account)

### Request

`POST https://api.duda.co/api/accounts/update/{account_name}`

```typescript
duda.accounts.update({ account_name: account_name });
```

## Delete Account

[Delete Account Reference](https://developer.duda.co/reference/accounts-delete-account)

### Request

`DELETE https://api.duda.co/api/accounts/{account_name}`

```typescript
duda.accounts.delete({ account_name: account_name });
```

# Authentication

## Get SSO Link

[Get SSO Link Reference](https://developer.duda.co/reference/authentication-get-sso-link)

### Request

`GET https://api.duda.co/api/accounts/sso/{account_name}/link`

```typescript
duda.accounts.authentication.getSSOLink({ account_name: account_name });
```

## Create Password Reset Link

[Create Password Reset Link Reference](https://developer.duda.co/reference/authentication-create-reset-password-link)

### Request

`POST https://api.duda.co/api/accounts/reset-password/{account_name}`

```typescript
duda.accounts.authentication.getResetPasswordLink({
  account_name: account_name,
});
```

## Create Welcome Link

[Create Welcome Link Reference](https://developer.duda.co/reference/authentication-create-welcome-link)

### Request

`POST https://api.duda.co/api/accounts/reset-password/{account_name}`

```typescript
duda.accounts.authentication.getWelcomeLink({ account_name: account_name });
```

# Permissions

## List Client Permissions

[List Client Permissions Reference](https://developer.duda.co/reference/client-permissions-list-client-permissions)

### Request

`GET https://api.duda.co/api/accounts/permissions/multiscreen`

```typescript
duda.accounts.permissions.list();
```

## Get Client Permissions

[Get Client Permissions Reference](https://developer.duda.co/reference/client-permissions-get-client-permissions)

### Request

`GET https://api.duda.co/api/accounts/{account_name}/sites/{site_name}/permissions`

```typescript
duda.accounts.permissions.get({
  account_name: account_name,
  site_name: site_name,
});
```

## List Client Sites

[List Client Sites Reference](https://developer.duda.co/reference/client-permissions-list-client-sites)

### Request

`GET https://api.duda.co/api/accounts/grant-access/{account_name}/sites/multiscreen`

```typescript
duda.accounts.permissions.listAccessibleSites({ account_name: account_name });
```

## Grant Site Access

[Grant Site Access Reference](https://developer.duda.co/reference/client-permissions-grant-site-access)

### Request

`POST https://api.duda.co/api/accounts/{account_name}/sites/{site_name}/permissions`

```typescript
duda.accounts.permissions.grantSiteAccess({
  account_name: account_name,
  site_name: site_name,
});
```

## Remove Site Access

[Remove Site Access Reference](https://developer.duda.co/reference/client-permissions-remove-site-access)

### Request

`DELETE https://api.duda.co/api/accounts/{account_name}/sites/{site_name}/permissions`

```typescript
duda.accounts.permissions.removeSiteAccess({
  account_name: account_name,
  site_name: site_name,
});
```

## List Duda Team Groups

[List Duda Team Groups Reference](https://developer.duda.co/reference/team-permissions-list-duda-team-groups)

### Request

`GET https://api.duda.co/api/permission-groups/default`

```typescript
duda.accounts.permissions.listDudaTeamGroups();
```

## List Custom Team Groups

[List Custom Team Groups Reference](https://developer.duda.co/reference/team-permissions-list-custom-team-groups)

### Request

`GET https://api.duda.co/api/permission-groups/custom`

```typescript
duda.accounts.permissions.listCustomTeamGroups();
```

## Assign Team Member to Group

[Assign Team Member to Group Reference](https://developer.duda.co/reference/team-permissions-assign-team-member-to-group)

### Request

`POST https://api.duda.co/api/permission-groups/{group_name}/accounts/{account_name}/add`

```typescript
duda.accounts.permissions.assignTeamMemberGroup({
  group_name: group_name,
  account_name: account_name,
});
```

# Content

## Get Content Library

[Get Content Library Reference](https://developer.duda.co/reference/site-content-get-content-library)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/content`

```typescript
duda.content.get({ site_name: site_name });
```

## Update Content Library

[Update Content Library Reference](https://developer.duda.co/reference/site-content-update-content-library)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/content`

```typescript
duda.content.update({ site_name: site_name });
```

## Publish Content Library

[Publish Content Library Reference](https://developer.duda.co/reference/site-content-publish-content-library)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/content/publish`

```typescript
duda.content.publish({ site_name: site_name });
```

## Get Location

[Get Location Reference](https://developer.duda.co/reference/site-content-get-location-data)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/content/location/{location_id}`

```typescript
duda.content.multilocation.get({
  site_name: site_name,
  location_id: location_id,
});
```

## Create Location

[Create Location Reference](https://developer.duda.co/reference/site-content-create-location)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/content/location`

```typescript
duda.content.multilocation.create({ site_name: site_name });
```

## Update Location

[Update Location Reference](https://developer.duda.co/reference/site-content-update-location)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/content/location/{location_id}`

```typescript
duda.content.multilocation.update({
  site_name: site_name,
  location_id: location_id,
});
```

## Delete Location

[Delete Location Reference](https://developer.duda.co/reference/site-content-delete-location)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/content/location/{location_id}`

```typescript
duda.content.multilocation.delete({
  site_name: site_name,
  location_id: location_id,
});
```

## Get Injected Content

[Get Injected Content Reference](https://developer.duda.co/reference/site-content-get-injected-content)

### Request

`GET https://api.duda.co/api/sites/multiscreen/inject-content/{site_name}`

```typescript
duda.content.injectedContent.get({ site_name: site_name });
```

## Create Injected Content

[Create Injected Content Reference](https://developer.duda.co/reference/site-content-create-injected-content)

### Request

`POST https://api.duda.co/api/sites/multiscreen/inject-content/{site_name}`

```typescript
duda.content.injectedContent.create({ site_name: site_name });
```

## Create Injected Content (Single Page)

[Create Injected Content (Single Page) Reference](https://developer.duda.co/reference/site-content-create-injected-content)

### Request

`POST https://api.duda.co/api/sites/multiscreen/inject-content/{site_name}/pages/{page_name}`

```typescript
duda.content.injectedContent.createSPA({
  site_name: site_name,
  page_name: page_name,
});
```

## Upload Resource

[Upload Resource Reference](https://developer.duda.co/reference/site-content-upload-resources)

### Request

`POST https://api.duda.co/api/sites/multiscreen/resources/{site_name}/upload`

```typescript
duda.content.uploadResource({ site_name: site_name });
```

# Snippets

## List Snippets

[List Snippets Reference](https://developer.duda.co/reference/list-snippets)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/snippets`

```typescript
duda.snippets.list({ site_name: site_name });
```

## Get Snippet

[Get Snippet Reference](https://developer.duda.co/reference/get-snippet)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/snippets/{id}`

```typescript
duda.snippets.get({ site_name: site_name, id: id });
```

## Create Snippet

[Create Snippet Reference](https://developer.duda.co/reference/create-snippet)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/snippets`

```typescript
duda.snippets.create({ site_name: site_name });
```

## Update Snippet

[Update Snippet Reference](https://developer.duda.co/reference/update-snippet)

### Request

`PATCH https://api.duda.co/api/sites/multiscreen/{site_name}/snippets/{id}`

```typescript
duda.snippets.update({ site_name: site_name, id: id });
```

## Publish Snippet

[Publish Snippet Reference](https://developer.duda.co/reference/publish-snippet)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/snippets/{id}/publish`

```typescript
duda.snippets.publish({ site_name: site_name, id: id });
```

## Delete Snippet

[Delete Snippet Reference](https://developer.duda.co/reference/delete-snippet)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/snippets/{id}`

```typescript
duda.snippets.delete({ site_name: site_name, id: id });
```

# Collections

## List Collections

[List Collections Reference](https://developer.duda.co/reference/collections-list-collections)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/collection`

```typescript
duda.collections.list({ site_name: site_name });
```

## Get Collection

[Get Collection Reference](https://developer.duda.co/reference/collections-get-collection)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}`

```typescript
duda.collections.get({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Create Collection

[Create Collection Reference](https://developer.duda.co/reference/collections-create-collection)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/collection`

```typescript
duda.collections.create({ site_name: site_name, name: name });
```

## Update Collection

[Update Collection Reference](https://developer.duda.co/reference/collections-update-collection)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{current_collection_name}`

```typescript
duda.collections.update({
  site_name: site_name,
  current_collection_name: current_collection_name,
});
```

## Delete Collection

[Delete Collection Reference](https://developer.duda.co/reference/collections-delete-collection)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}`

```typescript
duda.collections.delete({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Clear Cache

[Clear Cache Reference](https://developer.duda.co/reference/collections-clear-cache)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}/revalidate`

```typescript
duda.collections.clearCache({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Clear Cache by External ID

[Clear Cache by External ID Reference](https://developer.duda.co/reference/collections-clear-cache-by-external-id)

### Request

`POST https://api.duda.co/api/sites/multiscreen/collections/revalidate/{external_id}`

```typescript
duda.collections.clearCacheByExtID({ external_id: external_id });
```

## Create Rows

[Create Rows Reference](https://developer.duda.co/reference/collection-rows-create-rows)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}/row`

```typescript
duda.collections.rows.create({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Update Rows

[Update Rows Reference](https://developer.duda.co/reference/collection-rows-update-rows)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}/row`

```typescript
duda.collections.rows.update({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Delete Row

[Delete Row Reference](https://developer.duda.co/reference/collections-rows-delete-row)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}/row/{row_id}`

```typescript
duda.collections.rows.deleteRow({
  site_name: site_name,
  collection_name: collection_name,
  row_id: row_id,
});
```

## Delete Rows

[Delete Rows Reference](https://developer.duda.co/reference/collection-rows-delete-rows)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}/row`

```typescript
duda.collections.rows.delete({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Create Fields

[Create Fields Reference](https://developer.duda.co/reference/collection-fields-create-fields)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}/field`

```typescript
duda.collections.fields.create({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Update Field

[Update Field Reference](https://developer.duda.co/reference/collection-fields-update-field)

### Request

`PUT https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}/field/{field_name}`

```typescript
duda.collections.fields.update({
  site_name: site_name,
  collection_name: collection_name,
  field_name: field_name,
});
```

## Delete Field

[Delete Field Reference](https://developer.duda.co/reference/collection-fields-delete-field)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/collection/{collection_name}/field/{field_name}`

```typescript
duda.collections.fields.delete({
  site_name: site_name,
  collection_name: collection_name,
  field_name: field_name,
});
```

# Reporting

## Site Created

[Site Created Reference](https://developer.duda.co/reference/reporting-sites-created)

### Request

`GET https://api.duda.co/api/sites/multiscreen/created`

```typescript
duda.reporting.sites.created();
```

## Sites Published

[Sites Published Reference](https://developer.duda.co/reference/reporting-published-sites)

### Request

`GET https://api.duda.co/api/sites/multiscreen/published`

```typescript
duda.reporting.sites.published();
```

## Sites Unpublished

[Sites Unpublished Reference](https://developer.duda.co/reference/reporting-unpublished-sites)

### Request

`GET https://api.duda.co/api/sites/multiscreen/unpublished`

```typescript
duda.reporting.sites.unpublished();
```

## Form Submissions

[Form Submissions Reference](https://developer.duda.co/reference/reporting-form-submissions)

### Request

`GET https://api.duda.co/api/sites/multiscreen/get-forms/{site_name}`

```typescript
duda.reporting.forms.submissions({ site_name: site_name });
```

## Activities

[Activities Reference](https://developer.duda.co/reference/reporting-activity)

### Request

`GET https://api.duda.co/api/sites/multiscreen/{site_name}/activities`

```typescript
duda.reporting.activities.get({ site_name: site_name });
```

## Analytics

[Analytics Reference](https://developer.duda.co/reference/reporting-analytics)

### Request

`GET https://api.duda.co/api/analytics/site/{site_name}`

```typescript
duda.reporting.analytics.get({ site_name: site_name });
```

## Get Client Settings

[Get Client Settings Reference](https://developer.duda.co/reference/stats-email-get-client-settings)

### Request

`GET https://api.duda.co/api/accounts/{account_name}/sites/{site_name}/stats-email`

```typescript
duda.reporting.emailSettings.get({
  account_name: account_name,
  site_name: site_name,
});
```

## Create Subscription

[Create Subscription Reference](https://developer.duda.co/reference/stats-email-create-subscription)

### Request

`POST https://api.duda.co/api/accounts/{account_name}/sites/{site_name}/stats-email`

```typescript
duda.reporting.emailSettings.subscribe({
  account_name: account_name,
  site_name: site_name,
  frequency: frequency,
});
```

## Unsubscribe

[Unsubscribe Reference](https://developer.duda.co/reference/stats-email-delete-subscription)

### Request

`DELETE https://api.duda.co/api/accounts/{account_name}/sites/{site_name}/stats-email`

```typescript
duda.reporting.emailSettings.unsubscribe({
  account_name: account_name,
  site_name: site_name,
});
```

# Other

## List Backups

[List Backups Reference](https://developer.duda.co/reference/site-backups-list-backups)

### Request

`GET https://api.duda.co/api/sites/multiscreen/backups/{site_name}`

```typescript
duda.other.backups.list({ site_name: site_name });
```

## Create Backup

[Create Backup Reference](https://developer.duda.co/reference/site-backups-create-backup)

### Request

`POST https://api.duda.co/api/sites/multiscreen/backups/{site_name}/create`

```typescript
duda.other.backups.create({ site_name: site_name });
```

## Restore Backup

[Restore Backup Reference](https://developer.duda.co/reference/site-backups-restore-site)

### Request

`POST https://api.duda.co/api/sites/multiscreen/backups/{site_name}/restore/{backup_name}`

```typescript
duda.other.backups.restore({ site_name: site_name, backup_name: backup_name });
```

## Delete Backup

[Delete Backup Reference](https://developer.duda.co/reference/site-backups-delete-backup)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/backups/{site_name}/{backup_name}`

```typescript
duda.other.backups.delete({ site_name: site_name, backup_name: backup_name });
```

## Create Certificate

[Create Certificate Reference](https://developer.duda.co/reference/ssl-certificates-create-certificate)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/certificate`

```typescript
duda.other.ssl.create({ site_name: site_name });
```

## Renew Certificate

[Renew Certificate Reference](https://developer.duda.co/reference/ssl-certificates-renew-certificate)

### Request

`POST https://api.duda.co/api/sites/multiscreen/{site_name}/certificate/renew`

```typescript
duda.other.ssl.renew({ site_name: site_name });
```

## Delete Certificate

[Delete Certificate Reference](https://developer.duda.co/reference/ssl-certificates-delete-certificate)

### Request

`DELETE https://api.duda.co/api/sites/multiscreen/{site_name}/certificate`

```typescript
duda.other.ssl.delete({ site_name: site_name });
```

# Simple Editor

## Update Simple Editor Settings

[Update Simple Editors Settings Reference](https://developer.duda.co/reference/update-simple-editor-settings)

### Request

`PATCH  https://api.duda.co/api/sites/multiscreen/{site_name}/simple-editor`

```typescript
duda.diyEditor.update({
  site_name: site_name,
  onboarding_required: onboarding_required,
});
```

# Appstore Accounts

## Get Account Details

[Get Account Details Reference](https://developer.duda.co/reference/get-account-details)

### Request

`GET https://api.duda.co/api/integrationhub/application/site/{site_name}/account/details`

```typescript
duda.appstore.accounts.getOwner({ site_name: site_name });
```

# Appstore Sites

## Get Site

[Get Site Reference](https://developer.duda.co/reference/app-store-get-site)

### Request

`GET https://api.duda.co/api/integrationhub/application/site/{site_name}`

```typescript
duda.appstore.sites.get({ site_name: site_name });
```

## Update Site

[Update Site Reference](https://developer.duda.co/reference/app-update-site)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}`

```typescript
duda.appstore.sites.update({ site_name: site_name });
```

## Get Branding Details

[Get Branding Details Reference](https://developer.duda.co/reference/app-get-account-branding)

### Request

`GET https://api.duda.co/api/integrationhub/application/site/{site_name}/branding`

```typescript
duda.appstore.sites.getBrandingDetails({ site_name: site_name });
```

## Republish Site

[Republish Site Reference](https://developer.duda.co/reference/app-site-republish)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/republish`

```typescript
duda.appstore.sites.republish({ site_name: site_name });
```

## Upload Resources

[Upload Resources Reference](https://developer.duda.co/reference/app-site-upload)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/resources/upload`

```typescript
duda.appstore.sites.uploadResources({ site_name: site_name });
```

# Appstore Content

## Get Content Library

[Get Content Library Reference](https://developer.duda.co/reference/get-content-library)

### Request

`GET https://api.duda.co/api/integrationhub/application/site/{site_name}/content`

```typescript
duda.appstore.content.get({ site_name: site_name });
```

## Update Content Library

[Update Content Library Reference](https://developer.duda.co/reference/update-content-library)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content`

```typescript
duda.appstore.content.update({ site_name: site_name });
```

## Publish Content Library

[Publish Content Library Reference](https://developer.duda.co/reference/publish-content-library)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content/publish`

```typescript
duda.appstore.content.publish({ site_name: site_name });
```

## Get Location

[Get Location Reference](https://developer.duda.co/reference/get-location)

### Request

`GET https://api.duda.co/api/integrationhub/application/site/{site_name}/content/location/{location_id}`

```typescript
duda.appstore.content.locations.get({
  site_name: site_name,
  location_id: location_id,
});
```

## Create Location

[Create Location Reference](https://developer.duda.co/reference/create-location)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content/location`

```typescript
duda.appstore.content.locations.create({ site_name: site_name });
```

## Update Location

[Update Location Reference](https://developer.duda.co/reference/update-location-1)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content/location/{location_id}`

```typescript
duda.appstore.content.locations.update({
  site_name: site_name,
  location_id: location_id,
});
```

## Delete Location

[Delete Location Reference](https://developer.duda.co/reference/delete-location-1)

### Request

`DELETE https://api.duda.co/api/integrationhub/application/site/{site_name}/content/location/{location_id}`

```typescript
duda.appstore.content.locations.delete({
  site_name: site_name,
  location_id: location_id,
});
```

# Appstore Collections

## List Collections

[List Collections Reference](https://developer.duda.co/reference/list-collections-app)

### Request

`GET https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection`

```typescript
duda.appstore.collections.list({ site_name: site_name });
```

## Get Collection

[Get Collection Reference](https://developer.duda.co/reference/get-collection-app)

### Request

`GET https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}`

```typescript
duda.appstore.collections.get({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Create Collection

[Create Collection Reference](https://developer.duda.co/reference/create-collection-app)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection`

```typescript
duda.appstore.collections.create({ site_name: site_name, name: name });
```

## Update Collection

[Update Collection Reference](https://developer.duda.co/reference/update-collection-app)

### Request

`PUT https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}`

```typescript
duda.appstore.collections.update({
  site_name: site_name,
  current_collection_name: current_collection_name,
});
```

## Delete Collection

[Delete Collection Reference](https://developer.duda.co/reference/delete-collection-app)

### Request

`DELETE https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}`

```typescript
duda.appstore.collections.delete({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Clear Cache

[Clear Cache Reference](https://developer.duda.co/reference/clear-cache-app)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}/revalidate`

```typescript
duda.appstore.collections.clearCache({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Clear Cache by External ID

[Clear Cache by External ID Reference](https://developer.duda.co/reference/clear-cache-by-external-id-app)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}/revalidate/{external_id}`

```typescript
duda.appstore.collections.clearCacheByExtID({ external_id: external_id });
```

## Create Rows

[Create Rows Reference](https://developer.duda.co/reference/create-rows-app)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}/row`

```typescript
duda.appstore.collections.rows.create({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Update Rows

[Update Rows Reference](https://developer.duda.co/reference/update-rows-app)

### Request

`PUT https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}/row`

```typescript
duda.appstore.collections.rows.update({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Delete Rows

[Delete Rows Reference](https://developer.duda.co/reference/collection-rows-delete-rows)

### Request

`DELETE https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}/row`

```typescript
duda.appstore.collections.rows.delete({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Create Fields

[Create Fields Reference](https://developer.duda.co/reference/create-fields-app)

### Request

`POST https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}/field`

```typescript
duda.appstore.collections.fields.create({
  site_name: site_name,
  collection_name: collection_name,
});
```

## Update Field

[Update Field Reference](https://developer.duda.co/reference/update-fields-app)

### Request

`PUT https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}/field/{field_name}`

```typescript
duda.appstore.collections.fields.update({
  site_name: site_name,
  collection_name: collection_name,
  field_name: field_name,
});
```

## Delete Field

[Delete Field Reference](https://developer.duda.co/reference/delete-fields)

### Request

`DELETE https://api.duda.co/api/integrationhub/application/site/{site_name}/content/collection/{collection_name}/row`

```typescript
duda.appstore.collections.fields.delete({
  site_name: site_name,
  collection_name: collection_name,
  field_name: field_name,
});
```

# Appstore Pages

## Get Pages

[Get Pages Reference](https://developer.duda.co/reference/app-get-pages)

### Request

`GET https://api.duda.co/api/integrationhub/application/site/{site_name}/v2/pages`

```typescript
duda.appstore.pages.get({ site_name: site_name });
```

## Update Page

[Update Page Reference](https://developer.duda.co/reference/app-update-page)

### Request

`PUT https://api.duda.co/api/integrationhub/application/site/{site_name}/v2/pages/{page_uuid}`

```typescript
duda.appstore.pages.update({ site_name: site_name, page_uuid: page_uuid });
```

# Appstore eComm

## Get Settings

[Get Settings Reference](https://developer.duda.co/reference/app-get-ecomm-settings)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce`

```typescript
duda.appstore.ecomm.get({ site_name: site_name });
```

## Update Settings

[Update Settings Reference](https://developer.duda.co/reference/app-ecomm-update-settings)

### Request

`PATCH https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce`

```typescript
duda.appstore.ecomm.update({ site_name: site_name });
```

# Appstore eComm Products

## List Products

[List Products Reference](https://developer.duda.co/reference/app-list-products)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/products`

```typescript
duda.appstore.ecomm.products.list({ site_name: site_name });
```

## Get Product

[Get Product Reference](https://developer.duda.co/reference/app-get-product)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/products/{product_id}`

```typescript
duda.appstore.ecomm.products.get({
  site_name: site_name,
  product_id: product_id,
});
```

## Create Product

[Create Product Reference](https://developer.duda.co/reference/app-create-product)

### Request

`POST https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/products`

```typescript
duda.appstore.ecomm.products.create({ site_name: site_name });
```

## Update Product

[Update Product Reference](https://developer.duda.co/reference/app-update-product)

### Request

`PATCH https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/products/{product_id}`

```typescript
duda.appstore.ecomm.products.update({
  site_name: site_name,
  product_id: product_id,
});
```

## Delete Product

[Delete Product Reference](https://developer.duda.co/reference/app-delete-product)

### Request

`DELETE https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/products/{product_id}`

```typescript
duda.appstore.ecomm.products.delete({
  site_name: site_name,
  product_id: product_id,
});
```

# Appstore eComm Variations

## Get Product Variation

[Get Product Variation Reference](https://developer.duda.co/reference/app-get-product-variation)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/products/{product_id}/variations/{variation_id}`

```typescript
duda.appstore.ecomm.variations.get({
  site_name: site_name,
  product_id: product_id,
  variation_id: variation_id,
});
```

## Update Product Variation

[Update Product Variation Reference](https://developer.duda.co/reference/app-update-product-variation)

### Request

`PATCH https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/products/{product_id}/variations/{variation_id}`

```typescript
duda.appstore.ecomm.variations.update({
  site_name: site_name,
  product_id: product_id,
  variation_id: variation_id,
});
```

# Appstore eComm Product Options

## List Product Options

[List Product Options Reference](https://developer.duda.co/reference/app-ecommerce-list-product-options)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/options`

```typescript
duda.appstore.ecomm.options.list({ site_name: site_name });
```

## Get Product Option

[Get Product Option Reference](https://developer.duda.co/reference/app-ecommerce-get-product-option)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/options/{option_id}`

```typescript
duda.appstore.ecomm.options.get({ site_name: site_name, option_id: option_id });
```

## Create Product Option

[Create Product Option Reference](https://developer.duda.co/reference/app-ecommerce-create-product-option)

### Request

`POST https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/options`

```typescript
duda.appstore.ecomm.options.create({
  site_name: site_name,
  name: name,
  choices: choices,
});
```

## Update Product Option

[Update Product Option Reference](https://developer.duda.co/reference/app-ecommerce-update-product-option)

### Request

`PUT https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/options/{option_id}`

```typescript
duda.appstore.ecomm.options.update({
  site_name: site_name,
  option_id: option_id,
  name: name,
});
```

## Delete Product Option

[Delete Product Option Reference](https://developer.duda.co/reference/app-ecommerce-delete-product-option)

### Request

`DELETE https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/options/{option_id}`

```typescript
duda.appstore.ecomm.options.delete({
  site_name: site_name,
  option_id: option_id,
});
```

## Create Product Option Choice

[Create Product Option Choice Reference](https://developer.duda.co/reference/app-ecommerce-create-product-option)

### Request

`POST https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/options/{option_id}/choices`

```typescript
duda.appstore.ecomm.options.createChoice({
  site_name: site_name,
  option_id: option_id,
  value: value,
});
```

## Update Product Option Choice

[Update Product Option Choice Reference](https://developer.duda.co/reference/app-ecommerce-update-product-option-choice)

### Request

`PUT https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}`

```typescript
duda.appstore.ecomm.options.createChoice({
  site_name: site_name,
  option_id: option_id,
  choice_id: choice_id,
  value: value,
});
```

## Delete Product Option Choice

[Delete Product Option Choice Reference](https://developer.duda.co/reference/app-ecommerce-delete-product-option-choice)

### Request

`DELETE https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/options/{option_id}/choices/{choice_id}`

```typescript
duda.appstore.ecomm.options.createChoice({
  site_name: site_name,
  option_id: option_id,
  choice_id: choice_id,
});
```

# Appstore eComm Orders

## List Orders

[List Orders Reference](https://developer.duda.co/reference/app-list-orders)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/orders`

```typescript
duda.appstore.ecomm.orders.list({ site_name: site_name });
```

## Get Order

[Get Order Reference](https://developer.duda.co/reference/app-get-order)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/orders/{order_id}`

```typescript
duda.appstore.ecomm.orders.get({ site_name: site_name, order_id: order_id });
```

## Update Order

[Update Order Reference](https://developer.duda.co/reference/app-update-order)

### Request

`PATCH https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/orders/{order_id}`

```typescript
duda.appstore.ecomm.orders.update({ site_name: site_name, order_id: order_id });
```

## List Refunds

[List Refunds Reference](https://developer.duda.co/reference/app-list-refunds)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/orders/{order_id}/refunds`

```typescript
duda.appstore.ecomm.orders.listRefunds({
  site_name: site_name,
  order_id: order_id,
});
```

## Get Refund

[Get Refund Reference](https://developer.duda.co/reference/app-get-refund)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/orders/{order_id}/refunds/{refund_id}`

```typescript
duda.appstore.ecomm.orders.getRefund({
  site_name: site_name,
  order_id: order_id,
  refund_id: refund_id,
});
```

# Appstore eComm Payments

## Get Payment Session

[Get Payment Session Reference](https://developer.duda.co/reference/app-get-payment-session)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/payment-sessions/{session_id}`

```typescript
duda.appstore.ecomm.payments.get({
  site_name: site_name,
  session_id: session_id,
});
```

## Confirm Payment

[Confirm Payment Reference](https://developer.duda.co/reference/app-confirm-payment)

### Request

`POST https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/payment-sessions/{session_id}/confirm`

```typescript
duda.appstore.ecomm.payments.confirm({
  site_name: site_name,
  session_id: session_id,
});
```

# Appstore eComm Payment Gateways

## List Payment Gateways

[List Payment Gateways Reference](https://developer.duda.co/reference/app-list-payment-gateways)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/payment-gateways`

```typescript
duda.appstore.ecomm.gateways.list({ site_name: site_name });
```

## Get Payment Gateway

[Get Payment Gateway Reference](https://developer.duda.co/reference/app-get-payment-gateway)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/payment-gateways/{id}`

```typescript
duda.appstore.ecomm.gateways.get({
  site_name: site_name,
  gateway_id: gateway_id,
});
```

## Create Payment Gateway

[Create Payment Gateway Reference](https://developer.duda.co/reference/app-create-payment-gateway)

### Request

`POST https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/payment-gateways`

```typescript
duda.appstore.ecomm.gateways.create({
  site_name: site_name,
  live_payment_methods_url: live_payment_methods_url,
});
```

## Update Payment Gateway

[Update Payment Gateway Reference](https://developer.duda.co/reference/app-update-payment-gateway)

### Request

`PATCH https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/payment-gateways/{gateway_id}`

```typescript
duda.appstore.ecomm.gateways.update({
  site_name: site_name,
  gateway_id: gateway_id,
  live_payment_methods_url: live_payment_methods_url,
});
```

## Delete Payment Gateway

[Delete Payment Gateway Reference](https://developer.duda.co/reference/app-delete-payment-gateway)

### Request

`DELETE https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/payment-gateways/{gateway_id}`

```typescript
duda.appstore.ecomm.gateways.delete({
  site_name: site_name,
  gateway_id: gateway_id,
});
```

# Appstore eComm Shipping Providers

## List Shipping Providers

[List Shipping Providers Reference](https://developer.duda.co/reference/app-list-shipping-providers)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/sites/{site_name}/ecommerce/shipping-providers`

```typescript
duda.appstore.ecomm.shipping.list({ site_name: site_name });
```

## Get Shipping Provider

[Get Shipping Provider Reference](https://developer.duda.co/reference/app-get-shipping-provider)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/sites/{site_name}/ecommerce/shipping-providers/{id}`

```typescript
duda.appstore.ecomm.shipping.get({ site_name: site_name, id: id });
```

## Create Shipping Provider

[Create Shipping Provider Reference](https://developer.duda.co/reference/app-create-shipping-provider)

### Request

`POST https://api-sandbox.duda.co/api/integrationhub/application/sites/{site_name}/ecommerce/shipping-providers`

```typescript
duda.appstore.ecomm.shipping.create({
  site_name: site_name,
  live_shipping_rates_url: live_shipping_rates_url,
});
```

## Update Shipping Provider

[Update Shipping Provider Reference](https://developer.duda.co/reference/app-update-shipping-provider)

### Request

`PATCH https://api-sandbox.duda.co/api/integrationhub/application/sites/{site_name}/ecommerce/shipping-providers/{id}`

```typescript
duda.appstore.ecomm.shipping.update({ site_name: site_name, id: id });
```

## Delete Shipping Provider

[Delete Shipping Provider Reference](https://developer.duda.co/reference/app-delete-shipping-provider)

### Request

`DELETE https://api-sandbox.duda.co/api/integrationhub/application/sites/{site_name}/ecommerce/shipping-providers/{id}`

```typescript
duda.appstore.ecomm.shipping.delete({ site_name: site_name, id: id });
```

# Appstore eComm Store

## Get Store

[Get Store Reference](https://developer.duda.co/reference/app-get-store)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/multiscreen/{site_name}/ecommerce/store`

```typescript
duda.appstore.ecomm.store.get({ site_name: site_name });
```

# Appstore eComm Carts

## List Carts

[List Carts Reference](https://developer.duda.co/reference/app-list-carts)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/carts`

```typescript
duda.appstore.ecomm.carts.list({ site_name: site_name });
```

## Get Cart

[Get Cart Reference](https://developer.duda.co/reference/app-get-cart)

### Request

`GET get https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/ecommerce/carts/{cart_id}`

```typescript
duda.appstore.ecomm.carts.get({ site_name: site_name, cart_id: cart_id });
```

# Appstore Site Wide HTML

## List All Site Wide HTML

[List All Site Wide HTML Reference](https://developer.duda.co/reference/app-list-all-swh)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/sitewidehtml/list`

```typescript
duda.appstore.sitewidehtml.list({ site_name: site_name });
```

## Get Site Wide HTML

[Get Site Wide HTML Reference](https://developer.duda.co/reference/app-get-swh)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/sitewidehtml/{uuid}`

```typescript
duda.appstore.sitewidehtml.get({ site_name: site_name, uuid: uuid });
```

## Create Site Wide HTML

[Create Site Wide HTML Reference](https://developer.duda.co/reference/app-create-site-wide-html)

### Request

`POST https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/sitewidehtml`

```typescript
duda.appstore.sitewidehtml.create({ site_name: site_name });
```

## Update Site Wide HTML

[Update Site Wide HTML Reference](https://developer.duda.co/reference/app-update-swh)

### Request

`PUT https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/sitewidehtml/{uuid}`

```typescript
duda.appstore.sitewidehtml.update({ site_name: site_name, uuid: uuid });
```

## Delete Site Wide HTML

[Delete Site Wide HTML Reference](https://developer.duda.co/reference/app-delete-swh)

### Request

`DELETE https://api-sandbox.duda.co/api/integrationhub/application/site/{site_name}/sitewidehtml/{uuid}`

```typescript
duda.appstore.sitewidehtml.delete({ site_name: site_name, uuid: uuid });
```

# Appstore Manifest

## Get Manifest

[Get Manifest Reference](https://developer.duda.co/reference/app-get-manifest)

### Request

`GET https://api-sandbox.duda.co/api/integrationhub/application/{app_uuid}`

```typescript
duda.appstore.manifest.get({ app_uuid: app_uuid });
```

## Update Manifest

[Update Manifest Reference](https://developer.duda.co/reference/app-update-manifest)

### Request

`UPDATE https://api-sandbox.duda.co/api/integrationhub/application/{app_uuid}`

```typescript
duda.appstore.manifest.update({ app_uuid: app_uuid });
```

# Appstore Refresh

## Create New Access Token

[Create New Access Token Reference](https://developer.duda.co/reference/app-create-access-token)

### Request

`POST https://api-sandbox.duda.co/api/integrationhub/application/{app_uuid}/token/refresh`

```typescript
duda.appstore.tokens.create({ app_uuid: app_uuid });
```
