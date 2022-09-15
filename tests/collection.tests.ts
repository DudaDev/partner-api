import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Collection tests', () => {
    let duda: Duda;
    let scope: nock.Scope;

    const collection_info = {
      name: 'test_collection',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
      ]
    }
    const collection_output = {
      name: 'test_collection',
      customer_lock: 'unlocked',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
      ],
      values: [
        {
          id: '1',
          data: {
            info: 'test'
          }
        }
      ]
    }
    const external_details = {
      enabled: true,
      external_id: '1',
      external_endpoint: '2',
      page_item_url_field: '3',
      collection_data_json_path: '4',
      authorization_header_value: '5',
    }
    const collection_name = 'new_collection_name'
    const update_collection_payload = {
      name: collection_name,
      customer_lock: 'unlocked',
      external_details: external_details
    }

    const row_data = [
      {
        data: {
          info: 'test'
        }
      }
    ]
    const row_output = [{ id: '1'}]
    const row_update = [
      {
        id: '1',
        data: {
          info: 'test'
        }
      }
    ]

    const row_delete = ['123','456']

    const field = [
      {
        name: 'email',
        type: 'email'
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
    it('can create a collection', () => {
      scope.post('/api/sites/multiscreen/test_site/collection', (body) => {
        expect(body).to.eql(collection_info)
        return body
      }).reply(204)
      
      return duda.collections.create({
        site_name:'test_site',
        name: 'test_collection',
        fields: [
          {
            name: 'email',
            type: 'email'
          },
        ]
      })
    })

    it('can list all collections', () => {
      scope.get('/api/sites/multiscreen/test_site/collection').reply(200, collection_output)
      return duda.collections.list({ site_name:'test_site' })
    })

    it('can get a specific collection', () => {
      scope.get('/api/sites/multiscreen/test_site/collection/test_collection').reply(200, collection_output)
      return duda.collections.get({
        site_name: 'test_site',
        collection_name: 'test_collection'
      })
    })

    it('can successfully update a specific collection', () => {
      scope.put('/api/sites/multiscreen/test_site/collection/test_collection', (body) => {
        expect(body).to.eql(update_collection_payload)
        return body
      }).reply(204)
      return duda.collections.update({
        name: collection_name,
        site_name: 'test_site',
        current_collection_name: 'test_collection',
        customer_lock: 'unlocked',
        external_details: { ...external_details }
      })
    })

    it('can clear cache for a specific collection',() => {
      scope.post('/api/sites/multiscreen/test_site/collection/test_collection/revalidate').reply(200)
      return duda.collections.clearCache({
        site_name: 'test_site',
        collection_name: 'test_collection'
      })
    })

    it('can clear cache for specific collections by external_id', () => {
      scope.post('/api/sites/multiscreen/collections/revalidate/test_id').reply(200)
      return duda.collections.clearCacheByExtID({ external_id:'test_id' })
    })

    it('can delete a collection', () => {
      scope.delete('/api/sites/multiscreen/test_site/collection/test_collection').reply(204)
      return duda.collections.delete({
        site_name: 'test_site',
        collection_name: 'test_collection'
      })
    })

    describe('rows', () => {
      it('can add a row to a collection', () => {
        scope.post('/api/sites/multiscreen/test_site/collection/test_collection/row', (body) => {
          expect(body).to.eql(row_data)
          return body
        }).reply(200, row_output)
        
        return duda.collections.rows.create({
          site_name: 'test_site',
          collection_name: 'test_collection',
          raw_body: row_data
        })
      })

      it('can update a row in a collection', () => {
        scope.put('/api/sites/multiscreen/test_site/collection/test_collection/row', (body) => {
          expect(body).to.eql(row_update)
          return body
        }).reply(204)

        return duda.collections.rows.update({
          site_name: 'test_site',
          collection_name: 'test_collection',
          raw_body: row_update
        })
      })

      it('can delete a row from a collection', () => {
        scope.delete('/api/sites/multiscreen/test_site/collection/test_collection/row', (body) => {
          expect(body).to.eql(row_delete)
          return body
        }).reply(204)

        return duda.collections.rows.delete({
          site_name: 'test_site',
          collection_name: 'test_collection',
          raw_body: row_delete
        })
      })
    })

    describe('fields', () => {
      it('can add a field to a collection', () => {
        scope.post('/api/sites/multiscreen/test_site/collection/test_collection/field', (body) => {
          expect(body).to.eql(field)
          return body
        }).reply(204)

        return duda.collections.fields.create({
          site_name: 'test_site',
          collection_name: 'test_collection',
          raw_body: field
        })
      })

      it('can update a field in a collection', () => {
        scope.put('/api/sites/multiscreen/test_site/collection/test_collection/field/test_field', (body) => {
          expect(body).to.eql({ name:'new_name' })
          return body
        }).reply(204)

        return duda.collections.fields.update({
          site_name: 'test_site',
          collection_name: 'test_collection',
          field_name: 'test_field',
          name: 'new_name'
        })
      })

      it('can delete a field in a collection', () => {
        scope.delete('/api/sites/multiscreen/test_site/collection/test_collection/field/test_field').reply(204)
        return duda.collections.fields.delete({
          site_name: 'test_site',
          collection_name: 'test_collection',
          field_name: 'test_field'
        })
      })
    })
})