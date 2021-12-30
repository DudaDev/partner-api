/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
camelcase,
no-shadow
*/

import * as chai from 'chai';
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

before('create a new site to test against', async function () {
  this.timeout(10000);
  test_site = await GetTestSite();
});

beforeEach(function () {
  duda = Duda.New({
    user: process.env.DUDA_API_USER,
    pass: process.env.DUDA_API_PASS,
    env: Duda.envs.sandbox,
  });
});

describe('Duda.urlrules', function () {
  it('can get all url rules', function () {
    return duda.urlRules.getAll({ site_name: test_site });
  });

  let url_rule_id: string;

  it('can create a new url rule', function () {
    return duda.urlRules.create({
      site_name: test_site,
      source: '/',
      target: 'https://www.example.net',
      response_code: 302,
    })
      .then((resp: any) => url_rule_id = resp.id);
  });

  it('can get a url rule by id', function () {
    return duda.urlRules.get({
      site_name: test_site,
      id: url_rule_id,
    });
  });

  it('can update a url rule by id', function () {
    return duda.urlRules.update({
      site_name: test_site,
      id: url_rule_id,
      source: '/store',
    });
  });

  it('can delete a url rule by id', function () {
    return duda.urlRules.delete({
      site_name: test_site,
      id: url_rule_id,
    });
  });
});

after('delete the test site', async function () {
  this.timeout(10000);
  await DeleteTestSite();
});
