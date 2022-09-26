import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Site tests', () => {
    let duda: Duda;
    let scope: nock.Scope;
    const api_path = '/api/sites/multiscreen/';
    const account_name = 'test_account';
    const site_name = 'test_site';
    const external_uid = 'test_id';
    const template_id = 1;
    const site_domain = 'test.com';
    const new_default_domain_prefix = 'test_prefix';
    
    const create_response = { site_name: site_name };
    const get_response = {
        account_name: account_name,
        external_uid: external_uid,
        site_domain: site_domain
    }
    const get_array_response = [ site_name ]

    before(() => {
        duda = new Duda({
          user: 'testuser',
          pass: 'testpass',
          env: Duda.Envs.direct
        })

        scope = nock('https://api.duda.co')
    })
    // Requires number in Partner-API, string in Dev Docs, can take either input when executing either command
    it('can create a site', () => {
        scope.post(`${api_path}create`, (body) => {
            expect(body).to.eql({ template_id:template_id })
            return body
        }).reply(200, create_response)
        duda.sites.create({ template_id: 1})
    })
    it('can get a site by name', () => {
        scope.get(`${api_path}${site_name}`).reply(200, get_response)
        duda.sites.get({ site_name:site_name })
    })
    it('can update a site', () => {
        scope.post(`${api_path}update/${site_name}`, (body) => {
            expect(body).to.eql({ external_uid:external_uid })
            return body
        }).reply(204)
        duda.sites.update({ site_name:site_name, external_uid:external_uid })
    })
    it('can get a site by external id', () => {
        scope.get(`${api_path}byexternalid/${external_uid}`).reply(200, get_array_response)
        duda.sites.getByExternalID({ external_uid:external_uid })
    })
    it('can publish a site', () => {
        scope.post(`${api_path}publish/${site_name}`).reply(204)
        duda.sites.publish({ site_name:site_name })
    })
    it('can unpublish a site', () => {
        scope.post(`${api_path}unpublish/${site_name}`).reply(204)
        duda.sites.unpublish({ site_name:site_name })
    })
    it('can duplicate a site', () => {
        scope.post(`${api_path}duplicate/${site_name}`, (body) => {
            expect(body).to.eql({ new_default_domain_prefix:new_default_domain_prefix })
            return body
        }).reply(200, create_response)
        duda.sites.duplicate({ site_name:site_name, new_default_domain_prefix:new_default_domain_prefix })
    })

    it('can reset a site', () => {
      const site_data = { removeBizInfos: true };
        scope.post(`${api_path}reset/${site_name}`, (body) => {
            expect(body).to.eql({ template_id, site_data })
            return body
        }).reply(204)
        duda.sites.reset({ site_name, template_id, site_data})
    })

    // Dev Docs List template_id as string, can be either number or string
    // template_id not required Dev Docs, required to execute command (500)
    it('can switch the template of a site', () => {
        scope.post(`${api_path}switchTemplate/${site_name}`, (body) => {
            expect(body).to.eql({ template_id:template_id })
            return body
        }).reply(204)
        duda.sites.switchTemplate({ site_name:site_name, template_id:template_id })
    })
    it('can delete a site', () => {
        scope.delete(`${api_path}${site_name}`).reply(204)
        duda.sites.delete({ site_name:site_name })
    })
})