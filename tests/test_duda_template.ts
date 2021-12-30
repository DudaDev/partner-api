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

require('dotenv')
  .config();

const { expect } = chai;
chai.use(require('chai-as-promised'));

let duda: any;

beforeEach(function () {
  duda = Duda.New({
    user: process.env.DUDA_API_USER,
    pass: process.env.DUDA_API_PASS,
    host: Duda.envs.sandbox,
  });
});

describe('Duda.templates', function (this: any) {
  this.timeout(30000);

  let template_id: string;

  it('can successfully get all templates', function () {
    return duda.templates.list()
      .then((templates: any) => {
        template_id = templates[0].template_id;
      });
  });

  it('can successfully create a new template from an existing one', function () {
    return duda.templates.createFromTemplate({
      template_id,
      new_template_name: uuidv4(),
    })
      .then(async (template: any) => {
        template_id = template.template_id;
      });
  });

  it('can successfully get template by id', async function () {
    await duda.templates.get({
      template_id,
    })
      .then((response: any) => {
        expect(response.template_id)
          .to
          .equal(template_id);
      });
  });

  it('can successfully update a template by id', function () {
    return duda.templates.update({
      template_id,
      new_name: uuidv4(),
    });
  });

  it('can successfully create a new template from a site', async function () {
    const site = await duda.sites.create({
      template_id,
    });

    return duda.templates.createFromSite({
      site_name: site.site_name,
      new_template_name: uuidv4(),
    })
      .then(async (template: any) => {
        await duda.templates.delete({
          template_id: template.template_id,
        });
        await duda.sites.delete({
          site_name: site.site_name,
        });
      });
  });

  it('can successfully delete a template by id', async function () {
    return duda.templates.delete({
      template_id,
    });
  });
});
