/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
camelcase,
no-shadow
*/

import * as chai from 'chai';
import { v4 as uuidv4 } from 'uuid';

import * as sinon from 'sinon';
import { expect } from 'chai';
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

describe('Duda.other', function () {
  describe('Duda.other.backups', function (this: any) {
    this.timeout(30000);

    it('can sucessfully get all backups for a site', function () {
      return duda.other.backups.list({
        site_name: test_site,
      });
    });

    const backup_name = uuidv4();

    it('can successfully create a backup for a site', function () {
      return duda.other.backups.create({
        site_name: test_site,
        name: backup_name,
      });
    });

    it('can successfully restore a backup for a site', function () {
      return duda.other.backups.restore({
        site_name: test_site,
        backup_name,
      });
    });

    it('can successfully delete a backup for a site', function () {
      return duda.other.backups.delete({
        site_name: test_site,
        backup_name,
      });
    });
  });

  describe('Duda.other.ssl', function (this: any) {
    // TODO : figure out how to mock SSL generation
    // for now we're only checking if the methods can be called
    this.timeout(10000);

    it('can successfully generate an ssl cert for a site', function () {
      const spy = sinon.spy(duda.other.ssl, 'create');
      duda.other.ssl.create({
        site_name: test_site,
      })
        .catch((error: any) => {
          // eslint-disable-next-line
          console.log(error);
        });
      expect(spy.called)
        .to
        .equal(true);
    });

    it('can successfully renew an ssl cert for a site', function () {
      const spy = sinon.spy(duda.other.ssl, 'renew');
      duda.other.ssl.renew({
        site_name: test_site,
      })
        .catch((error: any) => {
          // eslint-disable-next-line
          console.log(error);
        });
      expect(spy.called)
        .to
        .equal(true);
    });

    it('can successfully delete an ssl cert for a site', function () {
      const spy = sinon.spy(duda.other.ssl, 'delete');
      duda.other.ssl.delete({
        site_name: test_site,
      })
        .catch((error: any) => {
          // eslint-disable-next-line
          console.log(error);
        });
      expect(spy.called)
        .to
        .equal(true);
    });
  });
});

after('delete the test site', async function () {
  this.timeout(10000);
  await DeleteTestSite();
});
