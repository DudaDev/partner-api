import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Content tests', () => {
    let duda: Duda;
    let scope: nock.Scope;

    const content = {
        "location_data":{
          "phones":[
            {
              "phoneNumber":"1",
              "label":"test_phone"
            }
          ],
          "emails":[
            {
              "emailAddress":"test@duda.co",
              "label":"test_email"
            }
          ],
          "label":"test",
          "social_accounts":{},
          "address":{},
          "address_geolocation":"test_location",
        }
    }
      

    before(() => {
        duda = new Duda({
          user: 'testuser',
          pass: 'testpass',
          env: Duda.Envs.direct
        })

        scope = nock('https://api.duda.co')
    })
    it('can successfully get the content library for a site', () => {
        scope.get('/api/sites/multiscreen/test_site/content').reply(200, content)
        return duda.content.get({ site_name:'test_site' })
    })
})