import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App tests', () => {
  const base_path = '/api/integrationhub/application' 
  const site_name = 'test'
  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'
  const resource_obj = { resource_type: 'IMAGE', src: 'https://example.org/path/to/resource.jpg'}

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

  it('should get site details', async () => {
    scope.get(`${base_path}/site/${site_name}`).reply(204)
    return await duda.appstore.sites.get({
      site_name,
      token
    })
  })

  it('should get site branding', async () => {
    scope.get(`${base_path}/site/${site_name}/branding`).reply(204)
    return await duda.appstore.sites.getBrandingDetails({ site_name, token })
  })

  it('should upload resources to a site', async () => {
    scope.post(`${base_path}/site/${site_name}/resources/upload`, (body) => {
      expect(body).to.eql([resource_obj])
      return body
    }).reply(204)

    return await duda.appstore.sites.uploadResources({ site_name, raw_body: [resource_obj], token })
  })
})