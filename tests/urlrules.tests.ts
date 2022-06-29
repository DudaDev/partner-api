import { expect } from "chai";
import nock from "nock"
import { Duda } from "../src/index"

describe('URLRule tests', () => {
  let duda: Duda;
  let scope: nock.Scope;
  const api_path = '/api/sites/multiscreen/site/';

  const response = {
    site_name: 'testsite',
    results: [{
      id: 'rule-id',
      source: "/page-path",
      target: "page-name-path-or-absolulte-url",
      response_code: 301
    }]
  }

  const { site_name } = response;
  const { id: rule_id, source, target, response_code } = response.results[0];

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can get all rules for a site', () => {
    scope.get(`${api_path}${site_name}/urlrules`).reply(200, response)
    duda.urlRules.getAll({ site_name })
  })

  it('can get a rule by id', () => {
    scope.get(`${api_path}${site_name}/urlrules/${rule_id}`).reply(200, response)
    duda.urlRules.get({ site_name, id: rule_id })
  })

  it('can create a rule for a site', () => {
    scope.post(`${api_path}${site_name}/urlrules`, (body) => {
      expect(body).to.eql({ source, target, response_code })
      return body
    }).reply(200, response)
    duda.urlRules.create({ site_name, source, target, response_code })
  })

  it('can update a rule by id', () => {
    scope.put(`${api_path}${site_name}/urlrules/${rule_id}`).reply(200, response)
    duda.urlRules.update({ id: rule_id, target, source, site_name, response_code })
  })

  it('can delete a rule for a site', () => {
    scope.delete(`${api_path}${site_name}/urlrules/${rule_id}`).reply(204)
    duda.urlRules.delete({ id: rule_id, site_name })
  })
})