import { expect } from "chai";
import nock from "nock"
import { Duda } from "../src/index"

describe('Template tests', () => {
  let duda: Duda;
  let scope: nock.Scope;
  const api_path = '/api/sites/multiscreen/templates';
  const new_name = 'New Name';
  const site_name = 'testsite';
  const lang = 'en';
  
  const response = [{
    template_name: "Auto Repair",
    preview_url: "http://dashboard.russjeffery.com/preview/dm-theme-1005442-en-328",
    thumbnail_url: "https://irp-cdn.multiscreensite.com/0f8a84df3a244e0f9249423e0588397f/siteTemplateIcons/IzrGRlYSCeQNUc4V1nAA_Auto_repair_BigPreview.png",
    desktop_thumbnail_url: "https://irp-cdn.multiscreensite.com/0f8a84df3a244e0f9249423e0588397f/siteTemplateIcons/GwrdUIcXTbOypxHaiUNZ_auto_repair_desktop.png",
    tablet_thumbnail_url: "https://irp-cdn.multiscreensite.com/0f8a84df3a244e0f9249423e0588397f/siteTemplateIcons/LUihe1rSq5kiizBraMgG_auto-repair_ipad.png",
    mobile_thumbnail_url: "https://irp-cdn.multiscreensite.com/0f8a84df3a244e0f9249423e0588397f/siteTemplateIcons/rcceNsKOTKSqSx5bnPME_auto-repair-mobile.png",
    template_id: '1005442',
    template_properties: {
      can_build_from_url: false,
      has_store: false,
      has_blog: false,
      page_count: 5,
      type: "duda"
    }
  }];

  const { template_id } = response[0];
  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can list all templates', () => {
    scope.get(`${api_path}`).reply(200, response)
    duda.templates.list()
  })

  it('can list all templates of a specific language', () => {
    scope.get(`${api_path}?lang=${lang}`).reply(200, response)
    duda.templates.list({ lang })
  })

  it('can get a template by id', () => {
    scope.get(`${api_path}/${template_id}`).reply(200, response[0])
    duda.templates.get({ template_id })
  })

  it('can update a template', () => {
    scope.post(`${api_path}/${template_id}`, (body) => {
      expect(body).to.eql({ new_name })
      return body
    }).reply(204)
    duda.templates.update({ new_name, template_id })
  })

  it('can create a template from a site', () => {
    scope.post(`${api_path}/fromsite`, (body) => {
      expect(body).to.eql({ site_name, new_template_name: new_name })
      return body
    }).reply(200, response)
    duda.templates.createFromSite({ site_name, new_template_name: new_name })
  })

  it('can create a template from a template', () => {
    scope.post(`${api_path}/fromtemplate`, (body) => {
      expect(body).to.eql({ template_id, new_template_name: new_name })
      return body
    }).reply(200, response)
    duda.templates.createFromTemplate({ template_id, new_template_name: new_name })
  })

  it('can delete a template', () => {
    scope.delete(`${api_path}/${template_id}`).reply(204)
    duda.templates.delete({ template_id })
  })
})