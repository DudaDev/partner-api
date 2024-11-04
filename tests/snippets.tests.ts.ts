import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Snippets tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const api_path = '/api/sites/multiscreen/';
  const site_name = 'string';
  const id = 'string';
  const markup = 'string';
  const location = 'BODY';

  const snippet = {
    location: location,
    markeup: markup,
    id: id
  }

  const results = [snippet]

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can list the snippets on a site', async () => {
      scope.get(`${api_path}${site_name}/snippets`).reply(200, results)
      return await duda.snippets.list({ site_name: site_name })
  })

  it('can get a specific snippet on a site by id', async () => {
    scope.get(`${api_path}${site_name}/snippets/${id}`).reply(200, snippet)
    return await duda.snippets.get({ site_name: site_name, id: id })
  })

  it('can create a snippet on a site', async () => {
    scope.post(`${api_path}${site_name}/snippets`, (body) => {
        expect(body).to.eql({ markup: markup, location: location })
        return body
    }).reply(200, snippet)
    return await duda.snippets.create({
      site_name: site_name,
      markup: markup,
      location: location
    })
  })

  it('can update a snippet on a site', async () => {
    scope.patch(`${api_path}${site_name}/snippets/${id}`, (body) => {
        expect(body).to.eql({ markup: markup, location: location })
        return body
    }).reply(200, { id: id })
    return await duda.snippets.update({
      site_name: site_name,
      id: id,
      markup: markup,
      location: location
    })
  })

  it('can publish a specific snippet on a site by id', async () => {
    scope.post(`${api_path}${site_name}/snippets/${id}/publish`).reply(204)
    return await duda.snippets.publish({ site_name: site_name, id: id })
  })

  it('can delete a specific snippet on a site by id', async () => {
    scope.delete(`${api_path}${site_name}/snippets/${id}`).reply(204)
    return await duda.snippets.delete({ site_name: site_name, id: id })
  })
})