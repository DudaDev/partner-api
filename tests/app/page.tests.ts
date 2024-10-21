import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App store page tests', () => {
  const base_path = '/api/integrationhub/application' 
  const site_name = 'test'
  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'

  const seo = {
    title: "My SEO Title",
    description: "SEO description of the page",
    no_index: false,
    og_image: "https://example.org/path/to/image.png"
  };

  const page = {
    title: "My Title",
    path: "/test",
    seo,
    header_html: "<b>Some HTML</b>"
  };

  const page_uuid = '123abc';

  const response = { ...page, uuid: page_uuid };
  const list = { results: [response] };

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

  it('can get the pages of the site', async () => {
    scope.get(`${base_path}/site/${site_name}/v2/pages`).reply(200, list)

    return await duda.appstore.pages.get({ site_name, token })
      .then(res => expect(res).to.eql({ ...list }))
  })

  it('can update a page by uuid', async () => {
    scope.put(`${base_path}/site/${site_name}/v2/pages/${page_uuid}`, (body) => {
        expect(body).to.eql(page)
        return body
    }).reply(200, response)
    return await duda.appstore.pages.update({
        ...page,
        site_name,
        page_uuid,
        token
    })
})
})