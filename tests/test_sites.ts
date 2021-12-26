/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
*/

import './fakes/api';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { v4 } from 'uuid';
import * as Duda from '../src/index';

const { expect } = chai;

chai.use(chaiAsPromised);

const duda = Duda.New({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  logLevel: 'debug',
  logger: console.log,
});

describe('Duda.sites', function () {
  it('can get a site', async function () {
    const siteName = 'foo';

    const get: any = await duda.sites.get({
      site_name: siteName,
    }, {
      host: 'api-sandbox.duda.co',
    });

    expect(get.site_name)
      .to
      .eq(siteName);
  });

  it('can update a site', async function () {
    const siteName = 'foo';

    const changeset = {
      externalUid: v4(),
    };

    const update = await duda.sites.update({
      site_name: siteName,
      ...changeset,
    }, {
      host: 'api-sandbox.duda.co',
    });

    expect(update)
      .deep
      .eq(changeset);
  });
});
