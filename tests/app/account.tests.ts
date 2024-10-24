import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App store account tests', () => {
  const base_path = '/api/integrationhub/application' 
  const site_name = 'test'
  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'

  const account_details = {
    email: "string",
    first_name: "string",
    last_name: "string",
    uuid: "string"
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

  it('can get the account owner details', async () => {
    scope.get(`${base_path}/site/${site_name}/account/details`).reply(200, account_details)

    return await duda.appstore.accounts.getOwner({ site_name, token })
      .then(res => expect(res).to.eql({ ...account_details }))
  })
})