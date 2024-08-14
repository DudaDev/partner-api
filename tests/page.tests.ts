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

    const create_page_oblect = {
        uuid: "My uuid",
        title: "My Title",
        path: "/test",
        seo,
        header_html: "<b>Some HTML</b>"
    }

    const page_object = {
        page: create_page_oblect
    }

    const page_uuid = '123abc';

    const response = { ...page, uuid: page_uuid };
    const list = { results: [response] };

    const element_id = 'element_id'

    const page_element = {
        type: "SECTION",
        element_id: element_id,
        next_sibling_id: "next_sibling_id",
        element_source_id: "element_source_id"
    }

    const list_page_elements_response = {
        results: [page_element]
    }

    const create_page_element_payload = {
        element_source_id: "element_source_id",
        type: "SECTION",
        next_sibling_id: "next_sibling_id",
        parent_element_id: "element_id"
    }

    const update_page_element_payload = {
        type: "SECTION",
        next_sibling_id: "next_sibling_id",
        parent_element_id: "element_id"
    }

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

    it('can create a page', async () => {
        scope.post(`${api_path}${site_name}${api_segment}`, (body) => {
            expect(body).to.eql(page_object)
            return body
        }).reply(200, response)
        return await duda.pages.v2.create({
          site_name,
          page: create_page_oblect
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

    describe('Page Elements', () => {
        it('can list all page elements on a site for a page', async () => {
            scope.get(`${api_path}${site_name}${api_segment}/${page_uuid}/elements`).reply(200, list_page_elements_response)
            return await duda.pages.elements.list({
                site_name: site_name,
                page_uuid: page_uuid
            })
        })

        it('can create a page element', async () => {
            scope.post(`${api_path}${site_name}${api_segment}/${page_uuid}/elements`, (body) => {
                expect(body).to.eql(create_page_element_payload)
                return body
            }).reply(200, page_element)
            return await duda.pages.elements.create({
              site_name: site_name,
              page_uuid: page_uuid,
              element_source_id: "element_source_id",
              type: "SECTION",
              next_sibling_id: "next_sibling_id",
              parent_element_id: "element_id"
            })
        })
    
        it('can update a page element by id', async () => {
            scope.put(`${api_path}${site_name}${api_segment}/${page_uuid}/elements/${element_id}`, (body) => {
                expect(body).to.eql(update_page_element_payload)
                return body
            }).reply(200, response)
            return await duda.pages.elements.update({
                site_name: site_name,
                page_uuid: page_uuid,
                element_id: element_id,
                type: "SECTION",
                next_sibling_id: "next_sibling_id",
                parent_element_id: "element_id"
            })
        })
    
        it('can delete a page by id', async () => {
            scope.delete(`${api_path}${site_name}${api_segment}/${page_uuid}/elements/${element_id}`).reply(204)
            return await duda.pages.elements.delete({
                site_name: site_name,
                page_uuid: page_uuid,
                element_id: element_id
            })
        })
      })
})