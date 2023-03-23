import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Ecomm tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const site_name = "test_site";
  const product_id = "test_product";
  const gateway_id = "test_gateway";

  const product = {
    "description": "The most amazing t shirt ever sold",
    "images": [
      {
        "alt": "Image of fancy shirt",
        "url": "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"
      }
    ],
    "name": "Amazing T-shirt",
    "prices": [
      {
        "compare_at_price": "19.99",
        "currency": "USD",
        "price": "12.34"
      }
    ],
    "seo": {
      "description": "Amazing T-shirt made with 100% biologic cotton",
      "product_url": "amazing-t-shirt",
      "title": "Amazing T-shirt"
    },
    "sku": "UGG-BB-PUR-06",
  }

  const list_product = {
    "limit" : 0,
    "offset": 0,
    "results": [ product ],
    "site_name": site_name,
    "total_responses": 0
  }

  const gateway = {
    live_payment_methods_url: 'https://example.org/path/to/gateway',
    test_payment_methods_url: 'https://test.example.org/path/to/gateway'
  }

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can list all products', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/products?limit=0&offset=0`).reply(200, list_product)
    return await duda.ecomm.products.list({
      site_name: site_name,
      limit: 0,
      offset: 0
    }).then(res => expect(res).to.eql(list_product))
  })

  it('can create a product', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/products`, (body) => {
      expect(body).to.eql({ ...product })
      return body
    }).reply(200, product)

    return await duda.ecomm.products.create({ site_name, ...product })
  })

  it('can get a product', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/products/${product_id}`).reply(200, product)

    return await duda.ecomm.products.get({ site_name, product_id })
      .then(res => expect(res).to.eql({ ...product }))
  })

  it('can update a product', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/products/${product_id}`, (body) => {
      expect(body).to.eql({ ...product})
      return body
    }).reply(200, product)

    return await duda.ecomm.products.update({ site_name, product_id, ...product })
  })

  it('can delete a product', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/products/${product_id}`).reply(204)
    return await duda.ecomm.products.delete({ site_name, product_id })
  })

  it('can create a gateway', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/payment-gateways`, (body) => {
      expect(body).to.eql({ ...gateway })
      return body
    }).reply(201, { id: 'abc123', ...gateway })

    return await duda.ecomm.gateways.create({ site_name, ...gateway })
  })

  it('can get a gateway', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/payment-gateways/${gateway_id}`)
      .reply(200, { gateway_id, ...gateway })

    return await duda.ecomm.gateways.get({ site_name, gateway_id })
  })

  it('can list all gateways', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/payment-gateways`)
      .reply(200, [ {gateway_id, ...gateway} ])

    return await duda.ecomm.gateways.list({ site_name })
  })
})