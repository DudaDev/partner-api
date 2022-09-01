import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Content tests', () => {
    let duda: Duda;
    let scope: nock.Scope;

    const content = {
      location_data:{
        phones:[
          {
            phoneNumber:"1",
            label:"test_phone"
          }
        ],
        emails:[
          {
            emailAddress:"test@duda.co",
            label:"test_email"
          }
        ],
        label:"test",
        social_accounts:{},
        address:{},
        address_geolocation:"test_location",
      }
  }

  const location = {
    uuid:"123",
    phones: [
      {
        phoneNumber: "1",
        label: "test_phone"
      }
    ],
    emails: [
      {
        emailAddress:"test@duda.co",
        label:"test_emali"
      }
    ],
    label: "test",
    social_accounts: {},
    address: {},
    logo_url: "test_logo",
    business_hours:  []
  }

  const resource_payload = [
    {
      resource_type: 'IMAGE',
      src: 'test'
    }
  ]
  const resource_output = {
    n_failures: 0,
    uploaded_resources: [
      {
        original_url: 'test1',
        new_url: 'test2',
        status: 'TEST',
      }
    ]
  }
  const injected_content = [
    {
      type: "INNERHTML",
      key: "my-key-email",
      value: "newEmail@domain.com"
    },
    {
      type: "DOMATTR",
      key: "my-key-email",
      value: "mailto:newEmail@domain.com",
      refs: ["href"]
    },
    {
      type: "CSS",
      key: "email-css",
      value: "#000000",
      refs: ["color"],
      important: false
    }
  ]
  const injected_query = [
    {
      key: 'test',
      type: 'DOMATTR',
      ref: 'test',
      value: 'testval'
    }
  ]
      
    before(() => {
      duda = new Duda({
        user: 'testuser',
        pass: 'testpass',
        env: Duda.Envs.direct
      })

      scope = nock('https://api.duda.co')
    })
    it('can get the content library for a site', () => {
      scope.get('/api/sites/multiscreen/test_site/content').reply(200, content)
      return duda.content.get({ site_name:'test_site' })
    })

    it('can update the content of a site', () => {
      scope.post('/api/sites/multiscreen/test_site/content', (body) => {
        expect(body).to.eql(content)
        return body
      }).reply(204)

      return duda.content.update({ site_name:'test_site', ...content })
    })

    it('can publish the content library of a site', () => {
      scope.post('/api/sites/multiscreen/test_site/content/publish').reply(204)
      return duda.content.publish({ site_name:'test_site' })
    })

    describe('multilocation', () => {
      it('can create a new location for a site', () => {
        scope.post('/api/sites/multiscreen/test_site/content/location', (body) => {
          expect(body).to.eql(location)
          return body
        }).reply(200, location)

        return duda.content.multilocation.create({ site_name:'test_site', ...location })
      })

      it('can get specific location data for a site', () => {
        scope.get('/api/sites/multiscreen/test_site/content/location/123').reply(200, location)
        return duda.content.multilocation.get({
          site_name: 'test_site',
          location_id: '123'
        })
      })

      it('can update a location for a site', () => {
        scope.post('/api/sites/multiscreen/test_site/content/location/123', (body) => {
          expect(body).to.eql(location)
          return body
        }).reply(204)

        return duda.content.multilocation.update({ site_name:'test_site', location_id:'123', ...location })
      })

      it('can delete a location for a site', () => {
        scope.delete('/api/sites/multiscreen/test_site/content/location/123').reply(204)
        return duda.content.multilocation.delete({
          site_name: 'test_site',
          location_id: '123'
        })
      })
    })
    describe('other', () => {
      // resource type can only be image, why do we need to specify then?
      it('can upload a resource to a site\'s content library', () => {
        scope.post('/api/sites/multiscreen/resources/test_site/upload', (body) => {
          expect(body).to.eql(resource_payload)
          return body
        }).reply(200, resource_output)

        return duda.content.uploadResource({
          site_name:'test_site',
          raw_body: [
            {
              resource_type: 'IMAGE',
              src: 'test'
            }
          ]
        })
      })
      
      it('can inject content into a site', () => {
        scope.post('/api/sites/multiscreen/inject-content/test_site', (body) => {
          expect(body).to.eql(injected_content)
          return body
        }).reply(204)

        return duda.content.injectedContent.create({
          site_name:'test_site',
          raw_body: injected_content
        })
      })

      it('can inject content into a specific page of a site', () => {
        scope.post('/api/sites/multiscreen/inject-content/test_site/pages/test_page', (body) => {
          expect(body).to.eql(injected_content)
          return body
        }).reply(204)

        return duda.content.injectedContent.createSPA({
          site_name: 'test_site',
          page_name: 'test_page',
          raw_body: injected_content
        })
      })

      it('can get injected content from a site', () => {
        scope.get('/api/sites/multiscreen/inject-content/test_site', (body) => {
          expect(body).to.eql({ key:'test', type:'CSS', ref: 'test'})
          return body
        }).reply(200, injected_query)

        return duda.content.injectedContent.get({
          site_name: 'test_site',
          key: 'test',
          type: 'CSS',
          ref: 'test'          
        })
      })
    })
})