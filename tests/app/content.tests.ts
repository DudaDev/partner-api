import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App store content tests', () => {
  const base_path = '/api/integrationhub/application' 
  const site_name = 'test_site';
  const location_id = 'test_location';

  const content = {
    location_data:{
      phones:[
        {
          phoneNumber:"1",
          label:"test_phone"
        }
      ],
      emails:[
        {
          emailAddress:"test@duda.co",
          label:"test_email"
        }
      ],
      label:"test",
      social_accounts:{},
      address:{}
    }
  }

  const location = {
    phones: [
      {
        phoneNumber: "1",
        label: "test_phone"
      }
    ],
    emails: [
      {
        emailAddress:"test@duda.co",
        label:"test_emali"
      }
    ],
    label: "test",
    social_accounts: {},
    address: {},
    logo_url: "test_logo",
    business_hours:  []
  }

  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'

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

  it('can get the content library for a site', async () => {
    scope.get(`${base_path}/site/${site_name}/content`).reply(200, content)
    return await duda.appstore.content.get({ site_name, token })
  })

  it('can update the content of a site with special chars', async () => {
    const location_data = { ...content.location_data, site_texts: { about_us: "’", }}
    scope.post(`${base_path}/site/${site_name}/content`, (body) => {
      expect(body).to.eql({ location_data })
      return body
    }).reply(204)

    return await duda.appstore.content.update({ location_data, site_name, token })
  })

  it('can publish the content library of a site', async () => {
    scope.post(`${base_path}/site/${site_name}/content/publish`).reply(204)
    return await duda.appstore.content.publish({ site_name, token })
  })

  describe('locations', () => {
    it('can create a new location for a site', async () => {
      scope.post(`${base_path}/site/${site_name}/content/location`, (body) => {
        expect(body).to.eql(location)
        return body
      }).reply(200, location)

      return await duda.appstore.content.locations.create({ ...location, site_name, token })
    })

    it('can get specific location data for a site', async () => {
      scope.get(`${base_path}/site/${site_name}/content/location/${location_id}`).reply(200, location)
      return await duda.appstore.content.locations.get({ site_name, location_id, token })
    })

    it('can update a location for a site', async () => {
      scope.post(`${base_path}/site/${site_name}/content/location/${location_id}`, (body) => {
        expect(body).to.eql(location)
        return body
      }).reply(204)

      return await duda.appstore.content.locations.update({ ...location, site_name, location_id, token })
    })

    it('can delete a location for a site', async () => {
      scope.delete(`${base_path}/site/${site_name}/content/location/${location_id}`).reply(204)
      return await duda.appstore.content.locations.delete({ site_name, location_id, token })
    })
  })
})