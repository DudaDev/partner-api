/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
camelcase,
no-shadow
*/

import * as chai from 'chai';

import { Duda } from '../src/index';

import {
  GetTestSite,
  DeleteTestSite,
} from './helpers';

require('dotenv')
  .config();

chai.use(require('chai-as-promised'));

let duda: any;
let test_site: any;

before('create a new site to test against', async function () {
  this.timeout(10000);
  test_site = await GetTestSite();
});

beforeEach(function () {
  duda = new Duda({
    user: process.env.DUDA_API_USER,
    pass: process.env.DUDA_API_PASS,
    env: Duda.envs.sandbox,
  });
});

describe('Duda.plans', function () {
  it('can get available site plans', function () {
    return duda.plans.list();
  });
  it('can get a site plan by site name', function () {
    return duda.plans.get({ site_name: test_site });
  });
  it('can update site plan', async function () {
    const [first] = await duda.plans.list();
    return duda.plans.update({
      site_name: test_site,
      plan_id: first.planId,
    });
  });
});

after('delete the test site', async function () {
  this.timeout(10000);
  await DeleteTestSite();
});
