import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App store site wide html tests', () => {
  const base_path = '/api/integrationhub/application' 
  const site_name = 'test'
  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'

  const uuid = 'test_uuid'
  const location = 'BODY'
  const markup = 'markup'

  const swh = {
    location: location,
    markup: markup,
    uuid: uuid
  }

  const swh_list_response = [swh]

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

  it('can list all site wide html', async () => {
    scope.get(`${base_path}/site/${site_name}/sitewidehtml/list`).reply(200, swh_list_response)
    return await duda.appstore.sitewidehtml.list({
      site_name: site_name,
      token
    }).then(res => expect(res).to.eql(swh_list_response))
  })

  it('can create a site wide html', async () => {
    scope.post(`${base_path}/site/${site_name}/sitewidehtml`, (body) => {
      expect(body).to.eql({ location: location, markup: markup })
      return body
    }).reply(200, swh)

    return await duda.appstore.sitewidehtml.create({ site_name, location, markup, token })
  })

  it('can get a specific site wide html', async () => {
    scope.get(`${base_path}/site/${site_name}/sitewidehtml/${uuid}`).reply(200, swh)

    return await duda.appstore.sitewidehtml.get({ site_name, uuid, token })
      .then(res => expect(res).to.eql({ ...swh }))
  })

  it('can update a specific site wide html', async () => {
    scope.put(`${base_path}/site/${site_name}/sitewidehtml/${uuid}`, (body) => {
      expect(body).to.eql({ location, markup })
      return body
    }).reply(200, swh)

    return await duda.appstore.sitewidehtml.update({ site_name, uuid, token, location, markup})
  })

  it('can publish the site wide html', async () => {
    scope.post(`${base_path}/site/${site_name}/sitewidehtml/${uuid}/publish`).reply(200, swh)
    return await duda.appstore.sitewidehtml.publish({ site_name, uuid, token })
  })

  it('can delete a specific site wide html', async () => {
    scope.delete(`${base_path}/site/${site_name}/sitewidehtml/${uuid}`).reply(204)
    return await duda.appstore.sitewidehtml.delete({ site_name, uuid, token })
  })
})