/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
camelcase,
no-shadow
*/

import * as chai from 'chai';
import { v4 as uuidv4 } from 'uuid';
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
    env: Duda.Envs.sandbox,
  });
});

describe('Duda.pages', function (this: any) {
  this.timeout(30000);

  let page_name: string;

  it('can successfully get all pages for a site name', function () {
    return duda.pages.list({
      site_name: test_site,
    })
      .then((response: any) => {
        if (Array.isArray(response)) {
          page_name = response[response.length - 1].page_name;
        } else {
          page_name = response.page_name;
        }
      });
  });

  const new_page = uuidv4();

  it('can successfully duplicate a page by name', function () {
    return duda.pages.duplicate({
      site_name: test_site,
      page_name,
      page_title: new_page,
    });
  });

  it('can successfully get a page by name', function () {
    return duda.pages.get({
      site_name: test_site,
      page_name,
    });
  });

  it('can successfully update a page by name', function () {
    return duda.pages.update({
      site_name: test_site,
      page_name,
      page_title: uuidv4(),
    });
  });

  it('can successfully delete a page by name', async function () {
    const not_home = await duda.pages.list({
      site_name: test_site,
    })
      .then((response: any) => {
        const pages = response.filter((a: any) => a.page_path !== 'home');
        return pages[0].page_name;
      })
      // eslint-disable-next-line
      .catch((err: any) => console.log(err));

    return duda.pages.delete({
      site_name: test_site,
      page_name: not_home,
    });
  });
});

describe('Duda.pages.v2', function (this: any) {
  this.timeout(30000);

  let page_uuid: string;

  it('can successfully get all pages of a site', function () {
    return duda.pages.v2.list({
      site_name: test_site,
    })
      .then((response: any) => {
        page_uuid = response.results[response.results.length - 1].uuid;
      });
  });

  const new_page = uuidv4();

  it('can successfully duplicate a page by uuid', function () {
    return duda.pages.v2.duplicate({
      site_name: test_site,
      page_uuid,
      title: new_page,
    });
  });

  it('can successfully get a page by uuid', function () {
    return duda.pages.v2.get({
      site_name: test_site,
      page_uuid,
    });
  });

  it('can successfully update a page by uuid', function () {
    return duda.pages.v2.update({
      site_name: test_site,
      page_uuid,
      title: uuidv4(),
    });
  });

  it('can successfully delete a page by uuid', async function () {
    const not_home = await duda.pages.v2.list({ site_name: test_site })
      .then((response: any) => {
        const pages = response.results.filter(
          (a: any) => a.path !== 'home',
        );
        return pages[0].uuid;
      })
      // eslint-disable-next-line
      .catch((err: any) => console.log(err));

    return duda.pages.v2.delete({
      site_name: test_site,
      page_uuid: not_home,
    });
  });
});

after('delete the test site', async function () {
  this.timeout(10000);
  await DeleteTestSite();
});
