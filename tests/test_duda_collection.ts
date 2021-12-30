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

before('create a new site to test against', async function () {
  this.timeout(10000);
  test_site = await GetTestSite();
});

beforeEach(function () {
  duda = Duda.New({
    user: process.env.DUDA_API_USER,
    pass: process.env.DUDA_API_PASS,
    host: Duda.envs.sandbox,
  });
});

describe('Duda.collections', async function (this: any) {
  this.timeout(10000);

  const collection_name = uuidv4();
  const collection_ext_id = uuidv4();

  it('can successfully create a collection', function () {
    return duda.collections.create({
      site_name: test_site,
      name: collection_name,
      fields: [
        {
          name: 'email',
          type: 'email',
        },
      ],
      external_details: {
        enabled: true,
        external_endpoint: 'https://dm-util.s3.amazonaws.com/russ/dynamic-pages/dynamic-pages-tour.json',
        external_id: collection_ext_id,
      },
    });
  });

  it('can successfully get all collections', function () {
    return duda.collections.list({
      site_name: test_site,
    })
      .then((response: any) => response[0].name);
  });

  it('can successfully get a specific collection', function () {
    return duda.collections.get({
      site_name: test_site,
      collection_name,
    });
  });

  const new_collection_name = uuidv4();

  it('can successfully update a specific collection', function () {
    return duda.collections.update({
      name: new_collection_name,
      site_name: test_site,
      current_collection_name: collection_name,
    });
  });

  it('can successfully clear cache for a specific collection', function () {
    return duda.collections.clearCache({
      site_name: test_site,
      collection_name: new_collection_name,
    });
  });

  it('can successfully clear cache for specific collections by external_id', function () {
    return duda.collections.clearCacheByExtID({
      external_id: collection_ext_id,
    });
  });

  it('can successfully delete a collection', async function () {
    return duda.collections.delete({
      site_name: test_site,
      collection_name: new_collection_name,
    });
  });

  describe('Duda.collections.row', async function () {
    const new_collection = uuidv4();
    let rows: any[];

    before('create a collection for testing', async function () {
      await duda.collections.create({
        site_name: test_site,
        name: new_collection,
        fields: [{
          name: 'email',
          type: 'email',
        }],
      });
    });

    it('can successfully add a row to a collection', async function () {
      return duda.collections.rows.create({
        site_name: test_site,
        collection_name: new_collection,
        raw_body: [
          { data: { email: `${uuidv4()}@example.com` } },
        ],
      })
        .then((response: any) => {
          rows = response;
        });
    });

    it('can successfully update a row in a collection', function () {
      return duda.collections.rows.update({
        site_name: test_site,
        collection_name: new_collection,
        // eslint-disable-next-line
        raw_body: rows.map((row: any) => (row.email = `${uuidv4()}@example.com`) && row),
      });
    });

    it('can successfully delete a row from a collection', function () {
      return duda.collections.rows.delete({
        site_name: test_site,
        collection_name: new_collection,
        raw_body: rows.map((row) => row.id),
      });
    });

    after('delete the test collection from the site', async function () {
      await duda.collections.delete({
        site_name: test_site,
        collection_name: new_collection,
      });
    });
  });

  describe('Duda.collections.fields', function () {
    const new_collection = uuidv4();
    const field_name = uuidv4();
    const updated_field_name = uuidv4();
    const new_field_name = uuidv4();

    before('create a collection for testing', async function () {
      await duda.collections.create({
        site_name: test_site,
        name: new_collection,
        fields: [{
          name: field_name,
          type: 'email',
        }],
      });
    });

    it('can successfully add a field to a collection', function () {
      return duda.collections.fields.create({
        site_name: test_site,
        collection_name: new_collection,
        raw_body: [
          {
            name: new_field_name,
            type: 'email',
          },
        ],
      });
    });

    it('can successfully update a field in a collection', function () {
      return duda.collections.fields.update({
        site_name: test_site,
        collection_name: new_collection,
        field_name: new_field_name,
        name: updated_field_name,
      });
    });

    it('can successfully delete a field in a collection', function () {
      return duda.collections.fields.delete({
        site_name: test_site,
        collection_name: new_collection,
        field_name: updated_field_name,
      });
    });

    after('delete the test collection from the site', async function () {
      await duda.collections.delete({
        site_name: test_site,
        collection_name: new_collection,
      });
    });
  });
});

after('delete the test site', async function () {
  this.timeout(10000);
  await DeleteTestSite();
});
