import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App store site tests', () => {
  const base_path = '/api/integrationhub/application' 
  const site_name = 'test'
  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'
  const resource_obj = { resource_type: 'IMAGE', src: 'https://example.org/path/to/resource.jpg'}

  const account_name = 'test_account';
  const external_uid = 'test_id';
  const site_domain = 'test.com';

  const get_response = {
    account_name: account_name,
    external_uid: external_uid,
    site_domain: site_domain
}

const branding_details = {
  logo: "string",
  color: {
    links: "string",
    button_background: "string",
    button_text: "string",
    text_on_light: "string",
    text_on_dark: "string",
    header_background: "string",
    preview_background: "string"
  },
  preview_background_image: "string",
  dashboard_domain: "string"
}

  let duda: Duda;
  let scope: nock.Scope;

  before(() => {
    duda = new Duda({
      user,
      pass,
      env: Duda.Envs.direct,
    })

    scope = nock('https://api.duda.co', {
      reqheaders: {
        'x-duda-access-token': `Bearer ${token}`
      }
    })
  })

  it('can get the site details', async () => {
    scope.get(`${base_path}/site/${site_name}`).reply(200, get_response)

    return await duda.appstore.sites.get({ site_name, token })
      .then(res => expect(res).to.eql({ ...get_response }))
  })

  it('can get the site branding', async () => {
    scope.get(`${base_path}/site/${site_name}/branding`).reply(200, branding_details)

    return await duda.appstore.sites.getBrandingDetails({ site_name, token })
      .then(res => expect(res).to.eql({ ...branding_details }))
  })

  it('can upload resources to a site', async () => {
    scope.post(`${base_path}/site/${site_name}/resources/upload`, (body) => {
      expect(body).to.eql([resource_obj])
      return body
    }).reply(201)

    return await duda.appstore.sites.uploadResources({ site_name, raw_body: [resource_obj], token })
  })

  it('can update a site', async () => {
    scope.post(`${base_path}/site/${site_name}`, (body) => {
        expect(body).to.eql({ external_uid:external_uid })
        return body
    }).reply(200)
    return await duda.appstore.sites.update({ site_name, external_uid, token })
  })

  it('can republish a site', async () => {
    scope.post(`${base_path}/site/${site_name}/republish`).reply(204)
    return await duda.appstore.sites.republish({ site_name, token })
  })
})