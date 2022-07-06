import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Page tests', () => {
    let duda: Duda;
    let scope: nock.Scope;
    const api_path = '/api/sites/multiscreen/';
    const site_name = 'test_site';

    const page = {
        uuid: "string",
        title: "string",
        path: "string",
        header_html: "string"
    };
    // const seo = {
    //     title: "string",
    //     description: "string",
    //     no_index: true
    // };
    const response = {
        result: [
            page
        ]
    };
    const { uuid: page_uuid, title } = page;
    // const { uuid: page_uuid, title, path, header_html } = page;

    before(() => {
        duda = new Duda({
          user: 'testuser',
          pass: 'testpass',
          env: Duda.Envs.direct
        })

        scope = nock('https://api.duda.co')
    })
    it('can get all pages for a site name', () => {
        scope.get(`${api_path}${site_name}/pages`).reply(200, response)
        duda.pages.v2.list({ site_name })
    })
    it('can get a page by name', () => {
        scope.get(`${api_path}${site_name}/pages/${page_uuid}`).reply(200, page)
        duda.pages.v2.get({ site_name, page_uuid })
    })
    // Issue with header_html and seo not being passed/recognized
    // it('can update a page by name', () => {
    //     scope.put(`${api_path}${site_name}/pages/${page_uuid}`, (body) => {
    //         expect(body).to.eql({ title: title, path: path })
    //         return body
    //     }).reply(204)
    //     duda.pages.v2.update({
    //         site_name: site_name,
    //         page_uuid: page_uuid,
    //         title: title,
    //         path: path,
    //         header_html: header_html
    //     })
    // })
    it('can duplicate a page by name', () => {
        scope.post(`${api_path}${site_name}/pages/${page_uuid}/duplicate`, (body) => {
            expect(body).to.eql({ title: title })
            return body
        }).reply(204)
        duda.pages.v2.duplicate({ site_name, page_uuid, title: title })
    })
    it('can delete a page by name', () => {
        scope.delete(`${api_path}${site_name}/pages/${page_uuid}`).reply(204)
        duda.pages.v2.delete({ site_name, page_uuid })
    })
})