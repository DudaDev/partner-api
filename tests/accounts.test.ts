import { v4 as uuidv4 } from 'uuid';
import { Duda } from '../src/index';

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
  duda = new Duda({
    user: process.env.DUDA_API_USER,
    pass: process.env.DUDA_API_PASS,
    env: Duda.Envs.sandbox,
  });
});

const ssoDetail = {
  url: 'testurl.com',
}

const errorMessage = 'account name does not exist'

const errorDetail = {
  error_code: 'InvalidInput',
  message: errorMessage,
}

const nock = require('nock')
const scope = nock('https://api.duda.co')
  .get('/api/accounts/sso/123abc/link')
  .reply(200, ssoDetail)
  .get('/api/accounts/sso/123abc/link')
  .replay(400, errorDetail)

setTimeout(() => {
  // Will throw an assertion error if meanwhile a "GET http://google.com" was
  // not performed.
  scope.done()
}, 5000)

/*describe('Duda.accounts', function (this: any) {
  this.timeout(10000);

  const account_name = uuidv4();

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
});*/
