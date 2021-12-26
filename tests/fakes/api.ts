import * as nock from 'nock';

// GetSiteByName
nock('https://api-sandbox.duda.co')
  .persist()
  .get(/\/api\/sites\/multiscreen\/[^/]+/gi)
  .reply(200, {
    site_name: 'foo',
  });

// UpdateSiteByName
nock('https://api-sandbox.duda.co')
  .persist()
  .post(/\/api\/sites\/multiscreen\/update\/[^/]+/gi)
  .reply(200, (_, body) => body);
