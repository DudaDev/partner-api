import nock from "nock"
import { Duda } from "../src/index"

describe('Section tests', () => {
  let duda: Duda;
  let scope: nock.Scope;
  const api_path = '/api/sections';
  const section_uuid = 'section_uuid'
  
  const Section = {
    uuid: 'section_uuid',
    name: 'name',
    thumbnail: 'thumbnail',
    category: 'category',
    visibility: 'PRIVATE',
    order: 0,
    editor: "ADVANCED"
  }

  const list_section_response = {
    results: [Section]
  }

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can list all sections', async () => {
    scope.get(`${api_path}`).reply(200, list_section_response)
    return await duda.sections.list()
  })

  it('can get a specific section by id', async () => {
    scope.get(`${api_path}/${section_uuid}`).reply(200, Section)
    return await duda.sections.get({ section_uuid: section_uuid })
  })
})