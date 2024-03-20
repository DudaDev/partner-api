import nock from 'nock';
import { expect } from 'chai';
import { Duda } from '../src/index';

describe('Network tests', () => {
  const path = '/api/sites/multiscreen/templates';
  let duda: Duda;
  let scope: nock.Scope;

  before(() => {
    duda = new Duda({
      maxNetworkRetries: 1,
      timeout: 1000,
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct,
    });

    scope = nock('https://api.duda.co');
  });

  it('should override the host for a specific call', async () => {
    const sandbox_scope = nock('https://api-sandbox.duda.co');
    sandbox_scope.get(path)
      .reply(200, 'Success');

    const res = await duda.templates.list({}, { host: 'api-sandbox.duda.co' });
    expect(res).to.eql({ data: 'Success' });
  });

  it('should remove the secure protocol for an overriden host', async () => {
    const sandbox_scope = nock('https://api-sandbox.duda.co');
    sandbox_scope.get(path)
      .reply(200, 'Success');

    const res = await duda.templates.list({}, { host: 'https://api-sandbox.duda.co' });
    expect(res).to.eql({ data: 'Success' });
  });

  it('should remove the unsecure protocol for an overriden host and attempt the secure protocol', async () => {
    const sandbox_scope = nock('https://api-sandbox.duda.co');
    sandbox_scope.get(path)
      .reply(200, 'Success');

    const res = await duda.templates.list({}, { host: 'http://api-sandbox.duda.co' });
    expect(res).to.eql({ data: 'Success' });
  });

  it('should retry when getting an error', async () => {
    scope.get(path)
      .replyWithError({
        code: 'ECONNREFUSED',
      })
      .get(path)
      .reply(200, 'Success');

    const res = await duda.templates.list();
    expect(res).to.eql({ data: 'Success' });
  }).timeout(3000);

  it('should reject on a non-recoverable network error', async () => {
    scope.get(path)
      .replyWithError({
        code: 'ECONNREFUSED',
      })
      .get(path)
      .replyWithError({
        code: 'ECONNREFUSED',
      });

    try {
      await duda.templates.list();
    } catch (e: any) {
      expect(e.code).to.eql('ECONNREFUSED');
    }
  }).timeout(3000);

  it('should reject on a non-recoverable network timeout', async () => {
    scope.get(path)
      .delayConnection(1500)
      .reply(204)
      .get(path)
      .delayConnection(1500)
      .reply(204);

    try {
      await duda.templates.list();
    } catch (e: any) {
      expect(e.code).to.eql('ECONNRESET');
    }
  }).timeout(3000);
});
