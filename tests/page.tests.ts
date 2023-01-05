import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Page tests', () => {
    let duda: Duda;
    let scope: nock.Scope;
    const api_path = '/api/sites/multiscreen/';
    const api_segment = '/pages';
    const site_name = 'test_site';

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

    before(() => {
        duda = new Duda({
          user: 'testuser',
          pass: 'testpass',
          env: Duda.Envs.direct
        })

        scope = nock('https://api.duda.co')
    })
    
    it('can get all pages for a site name', async () => {
        scope.get(`${api_path}${site_name}${api_segment}`).reply(200, list)
        return await duda.pages.v2.list({ site_name })
    })

    it('can get a page by name', async () => {
        scope.get(`${api_path}${site_name}${api_segment}/${page_uuid}`).reply(200, response)
        return await duda.pages.v2.get({ site_name, page_uuid })
    })

    it('can update a page by uuid', async () => {
        scope.put(`${api_path}${site_name}${api_segment}/${page_uuid}`, (body) => {
            expect(body).to.eql(page)
            return body
        }).reply(200, response)
        return await duda.pages.v2.update({
            ...page,
            site_name,
            page_uuid,
        })
    })

    it('can duplicate a page by name', async () => {
        scope.post(`${api_path}${site_name}${api_segment}/${page_uuid}/duplicate`, (body) => {
            expect(body).to.eql(page)
            return body
        }).reply(200, response)
        return await duda.pages.v2.duplicate({
          ...page,
          site_name,
          page_uuid,
        })
    })

    it('can delete a page by name', async () => {
        scope.delete(`${api_path}${site_name}${api_segment}/${page_uuid}`).reply(204)
        return await duda.pages.v2.delete({ site_name, page_uuid })
    })
})