/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
camelcase,
no-shadow
*/

import * as chai from 'chai';
import { v4 as uuidv4 } from 'uuid';
import * as Duda from '../src/index';

import {
  GetTestSite,
  DeleteTestSite,
} from './helpers';

require('dotenv')
  .config();

chai.use(require('chai-as-promised'));

let duda: any;
let test_site: any;

const account_name = uuidv4();

before('create a new site and account to test against', async function () {
  this.timeout(10000);
  test_site = await GetTestSite();

  duda = Duda.New({
    user: process.env.DUDA_API_USER,
    pass: process.env.DUDA_API_PASS,
    env: Duda.envs.sandbox,
  });

  await duda.accounts.create({
    account_name,
    account_type: 'CUSTOMER',
  });
});

beforeEach(function () {
  duda = Duda.New({
    user: process.env.DUDA_API_USER,
    pass: process.env.DUDA_API_PASS,
    env: Duda.envs.sandbox,
  });
});

describe('Duda.reporting', function (this: any) {
  this.timeout(30000);

  it('can successfully get a list of recently published sites', function () {
    return duda.reporting.sites.published({
      last_days: 7,
    });
  });

  it('can successfully get a list of recently unpublished sites', function () {
    return duda.reporting.sites.unpublished({
      last_days: 7,
    });
  });

  it('can successfully get a list of created sites', function () {
    return duda.reporting.sites.created({
      from: '2021-01-01',
      to: '2021-12-01',
    });
  });

  it('can successfully get a list of form submissions', function () {
    return duda.reporting.forms.submissions({
      site_name: test_site,
      from: '2021-01-01',
      to: '2021-12-01',
    });
  });

  it('can successfully subscribe a customer to a site', function () {
    return duda.reporting.emailSettings.subscribe({
      account_name,
      site_name: test_site,
      frequency: 'WEEKLY',
    });
  });

  it('can successfully get email settings for an account', function () {
    return duda.reporting.emailSettings.get({
      account_name,
      site_name: test_site,
    });
  });

  it('can successfully unsubscribe a customer to a site', function () {
    return duda.reporting.emailSettings.unsubscribe({
      account_name,
      site_name: test_site,
    });
  });

  after('delete the test account', async function () {
    await duda.accounts.delete({
      account_name,
    });
  });

  describe('Duda.reporting.analytics', function () {
    it('can successfully get analytics history for a site', function () {
      return duda.reporting.analytics.get({
        site_name: test_site,
        from: '2021-01-01',
        to: '2021-12-01',
        dimension: 'system',
        result: 'activities',
        date_granularity: 'WEEKS',
      });
    });
  });

  describe('Duda.reporting.activity', function () {
    it('can successfully get the activity log for a site', function () {
      return duda.reporting.activities.get({
        site_name: test_site,
        limit: 100,
        offset: 0,
        from: '2021-01-01',
        to: '2021-12-01',
        activities: ['site_created', 'site_published', 'page_created', 'page_deleted'],
      });
    });
  });
});

after('delete the test site', async function () {
  this.timeout(10000);
  await DeleteTestSite();
});
