import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"
import { CreateSitePayload, SiteThemeColor } from "../src/lib/sites/types"
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

    const site_obj: CreateSitePayload = {
      template_id,
      default_domain_prefix: new_default_domain_prefix,
      lang: 'en',
      site_data: {
        external_uid,
        site_domain: 'example.org',
        site_alternate_domains: {
          domains: ['example2.org', 'example3.org'],
          is_redirect: true
        },
        site_seo: {
          og_image: 'https://example.org/path/to/image.png',
          title: 'My Title',
          description: 'My long description'
        },
        site_business_info: {
          email: 'me@example.org',
          phone_number: '555-123-4567',
          business_name: 'My Business',
          address: {
            country: 'US',
            city: 'Louisville',
            state: 'CO',
            street: 'Canon St',
            zip_code: '80027'
          }
        }
      }
    }

    const colors_obj: SiteThemeColor = {
        id: "color_1",
        value: "xffffff",
        label: "test_label"
    }
    const colors = [colors_obj]

    const create_response = { site_name: site_name };
    const get_response = {
        account_name: account_name,
        external_uid: external_uid,
        site_domain: site_domain
    }
    const list_response = {
        offset: 0,
        limit: 0,
        total_responses: 1,
        results: [get_response]
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
    it('can create a site', async () => {
        scope.post(`${api_path}create`, (body) => {
            expect(body).to.eql({ template_id:template_id })
            return body
        }).reply(200, create_response)
        return await duda.sites.create({ template_id: 1})
    })
    it('can create a site with a full site object', async () => {
        scope.post(`${api_path}create`, (body) => {
            expect(body).to.eql({ ...site_obj })
            return body
        }).reply(200, create_response)
        return await duda.sites.create({ ...site_obj })
    })
    it('can list all sites', async () => {
        scope.get(`/api/sites/multiscreen`).reply(200, list_response)
        return await duda.sites.list()
    })
    it('can get a site by name', async () => {
        scope.get(`${api_path}${site_name}`).reply(200, get_response)
        return await duda.sites.get({ site_name:site_name })
    })
    it('can update a site', async () => {
        scope.post(`${api_path}update/${site_name}`, (body) => {
            expect(body).to.eql({ external_uid:external_uid })
            return body
        }).reply(204)
        return await duda.sites.update({ site_name:site_name, external_uid:external_uid })
    })
    it('can get a site by external id', async () => {
        scope.get(`${api_path}byexternalid/${external_uid}`).reply(200, get_array_response)
       return await duda.sites.getByExternalID({ external_uid:external_uid })
    })
    it('can publish a site', async () => {
        scope.post(`${api_path}publish/${site_name}`).reply(204)
        return await duda.sites.publish({ site_name:site_name })
    })
    it('can unpublish a site', async () => {
        scope.post(`${api_path}unpublish/${site_name}`).reply(204)
        return await duda.sites.unpublish({ site_name:site_name })
    })
    it('can duplicate a site', async () => {
        scope.post(`${api_path}duplicate/${site_name}`, (body) => {
            expect(body).to.eql({ new_default_domain_prefix })
            return body
        }).reply(200, create_response)
        return await duda.sites.duplicate({ site_name, new_default_domain_prefix })
    })

    it('can reset a site', async () => {
      const site_data = { removeBizInfos: true };
        scope.post(`${api_path}reset/${site_name}`, (body) => {
            expect(body).to.eql({ template_id, site_data })
            return body
        }).reply(204)
        return await duda.sites.reset({ site_name, template_id, site_data})
    })

    // Dev Docs List template_id as string, can be either number or string
    // template_id not required Dev Docs, required to execute command (500)
    it('can switch the template of a site', async () => {
        scope.post(`${api_path}switchTemplate/${site_name}`, (body) => {
            expect(body).to.eql({ template_id:template_id })
            return body
        }).reply(204)
        return await duda.sites.switchTemplate({ site_name:site_name, template_id:template_id })
    })
    it('can delete a site', async () => {
        scope.delete(`${api_path}${site_name}`).reply(204)
        return await duda.sites.delete({ site_name:site_name })
    })
    it('can get the site theme of a site', async () => {
        scope.get(`${api_path}${site_name}/theme`).reply(200, get_response)
        return await duda.sites.theme.get({ site_name:site_name })
    })
    it('can update the site theme of a site', async () => {
        scope.put(`${api_path}${site_name}/theme`, (body) => {
            expect(body).to.eql({ colors: colors })
            return body
        }).reply(200, colors)
        return await duda.sites.theme.update({ site_name:site_name, colors: colors })
    })
})
