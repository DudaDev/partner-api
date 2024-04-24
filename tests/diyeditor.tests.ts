import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Simple Editor tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const site_name = 'test_site';
  const onboarding_required = 'REQUIRED'

  const response = {
    onboarding_required: onboarding_required
  }

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can update simple editor settings', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/simple-editor`, (body) => {
      expect(body).to.eql({ onboarding_required: 'REQUIRED' })
      return body
    }).reply(200, response)

    return await duda.diyEditor.update({ site_name, onboarding_required })
  })
})