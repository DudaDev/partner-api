import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Navigation tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const api_path = '/api/sites/multiscreen/';
  const site_name = 'string';
  const navigation_id = 'string';
  const lang = 'en';

  const dynamic_navigation = {
    type: 'DYNAMIC_PAGE_ITEMS',
    collection_name: 'string',
    display_field: 'string',
    hidden: ['DESKTOP', 'MOBILE', 'TABLET'],
    dynamic_navigation_parent: true
  }

  const navigation = {
    id: 'string',
    title: 'string',
    url: 'string',
    type: 'FOLDER',
    hidden: ['DESKTOP', 'MOBILE', 'TABLET'],
    dynamic_navigation: dynamic_navigation,
    parent_id: 'string',
    next_sibling_id: 'string',
    depth: 0
  }

  const navigation_response_object = {
    lang: lang,
    navigation: [navigation]
  }

  const list_navigation_response_object = {
    results: [navigation_response_object]
  }

  const create_navigation_payload_object = {
    type: 'PAGE',
    title: 'string',
    hidden: ['DESKTOP', 'MOBILE', 'TABLET'],
    parent_id: 'string',
    next_sibling_id: 'string'
  }

  const update_navigation_payload_object = {
    hidden: ['DESKTOP', 'MOBILE', 'TABLET'],
    parent_id: 'string',
    next_sibling_id: 'string'
  }

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can list the site navigation', async () => {
      scope.get(`${api_path}${site_name}/navigation`).reply(200, list_navigation_response_object)
      return await duda.navigation.list({ site_name: site_name })
  })

  it('can get the site navigation by lang', async () => {
    scope.get(`${api_path}${site_name}/navigation/${lang}`).reply(200, navigation_response_object)
    return await duda.navigation.getByLang({ site_name: site_name, lang: lang })
  })

  it('can create the site navigation', async () => {
    scope.post(`${api_path}${site_name}/navigation/${lang}/items`, (body) => {
        expect(body).to.eql({ ...create_navigation_payload_object })
        return body
    }).reply(200, navigation)
    return await duda.navigation.create({
      site_name: site_name,
      lang:lang,
      type: 'PAGE',
      title: 'string',
      hidden: ['DESKTOP', 'MOBILE', 'TABLET'],
      parent_id: 'string',
      next_sibling_id: 'string'
    })
  })

  it('can update the site navigation', async () => {
    scope.patch(`${api_path}${site_name}/navigation/${lang}/items/${navigation_id}`, (body) => {
        expect(body).to.eql({ ...update_navigation_payload_object })
        return body
    }).reply(200, navigation)
    return await duda.navigation.update({
      site_name: site_name,
      lang: lang,
      navigation_id: navigation_id,
      hidden: ['DESKTOP', 'MOBILE', 'TABLET'],
      parent_id: 'string',
      next_sibling_id: 'string'
    })
  })
})