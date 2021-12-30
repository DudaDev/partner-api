/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
camelcase,
no-shadow
*/

import { v4 as uuidv4 } from 'uuid';
import * as Duda from '../src/index';

import {
  GetTestSite,
  DeleteTestSite,
} from './helpers';

require('dotenv')
  .config();

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

describe('Duda.accounts', function (this: any) {
  this.timeout(10000);

  const account_name = uuidv4();

  it('can successfully create an account', function () {
    return duda.accounts.create({
      account_name,
      first_name: 'Hello',
      last_name: 'World',
      lang: 'en',
      email: 'everett@example.com',
      account_type: 'CUSTOMER',
    });
  });

  it('can successfully get an account by name', function () {
    return duda.accounts.get({
      account_name,
    });
  });

  it('can successfully update an account by name', function () {
    return duda.accounts.update({
      account_name,
      first_name: 'World',
      last_name: 'Hello',
      lang: 'es',
      email: `${uuidv4()}@example.net`,
    });
  });

  it('can successfully delete an account by name', function () {
    return duda.accounts.delete({
      account_name,
    });
  });

  describe('Duda.accounts.permissions', function (this: any) {
    this.timeout(10000);

    const account_name = uuidv4();

    before('create an account to test against', async function () {
      await duda.accounts.create({
        account_name,
      });
    });

    it('can successfully grant site access for an account by name', function () {
      return duda.accounts.permissions.grantSiteAccess({
        account_name,
        site_name: test_site,
        permissions: ['EDIT'],
      });
    });

    it('can successfully get all permissions', function () {
      return duda.accounts.permissions.list();
    });

    it('can successfully get site permissions for an account by name', function () {
      return duda.accounts.permissions.get({
        account_name,
        site_name: test_site,
      });
    });

    it('can successfully get all accessible sites for an account by name', function () {
      return duda.accounts.permissions.listAccessibleSites({
        account_name,
      });
    });

    it('can successfully remove site access for an account by name', function () {
      return duda.accounts.permissions.removeSiteAccess({
        site_name: test_site,
        account_name,
      });
    });

    after('remove test account', async function () {
      await duda.accounts.delete({
        account_name,
      });
    });
  });

  describe('Duda.accounts.authentication', function (this: any) {
    this.timeout(10000);

    const account_name = uuidv4();

    before('create an account to test against', async function () {
      await duda.accounts.create({
        account_name,
      });
    });

    it('can successfully get an SSO link for an account by name', function () {
      return duda.accounts.authentication.getSSOLink({
        account_name,
        site_name: test_site,
      });
    });

    it('can successfully reset a password for an account by name', function () {
      return duda.accounts.authentication.getResetPasswordLink({
        account_name,
      });
    });

    after('remove test account', async function () {
      await duda.accounts.delete({
        account_name,
      });
    });
  });
});

after('delete the test site', async function () {
  this.timeout(10000);
  await DeleteTestSite();
});
