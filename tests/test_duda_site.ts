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

require('dotenv')
  .config();

chai.use(require('chai-as-promised'));

let duda: any;

beforeEach(function () {
  duda = new Duda({
    user: process.env.DUDA_API_USER,
    pass: process.env.DUDA_API_PASS,
    env: Duda.Envs.sandbox,
  });
});

describe('Duda.sites', function (this: any) {
  this.timeout(60000);

  let site_name: string;

  it('can successfully create a site', function () {
    return duda.sites.create({
      template_id: 1010905,
    })
      .then((response: any) => {
        site_name = response.site_name;
      });
  });

  it('can successfully get a site by name', async function () {
    return duda.sites.get({
      site_name,
    });
  });

  const external_id = uuidv4();

  it('can successfully update a site', async function () {
    return duda.sites.update({
      site_name,
      external_uid: external_id,
    });
  });

  it('can successfully get a site by external id', async function () {
    return duda.sites.getByExternalID({
      external_uid: external_id,
    });
  });

  it('can successfully publish a site', async function () {
    return duda.sites.publish({
      site_name,
    });
  });

  it('can successfully unpublish a site', async function () {
    return duda.sites.unpublish({
      site_name,
    });
  });

  it('can successfully duplicate a site', async function () {
    return duda.sites.duplicate({
      site_name,
      new_default_domain_prefix: uuidv4(),
    })
      .then(async (site: any) => duda.sites.delete({
        site_name: site.site_name,
      }));
  });

  it('can successfully reset a site', function () {
    return duda.sites.reset({
      site_name,
      template_id: 1010905,
      site_data: {
        removeBizInfos: false,
      },
    });
  });

  it('can successfully switch the template of a site', function () {
    return duda.sites.switchTemplate({
      site_name,
      template_id: 1036413,
    });
  });

  it('can successfully delete a site', function () {
    return duda.sites.delete({
      site_name,
    });
  });
});
