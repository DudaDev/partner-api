import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Ecomm tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

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

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can create a product', async () => {
    scope.post('/api/sites/multiscreen/test_site/ecommerce/products', (body) => {
      expect(body).to.eql({ ...product })
      return body
    }).reply(200, product)

    return await duda.ecomm.products.create({ site_name: "test_site", ...product })
  })

  it('can update a product', async () => {
    scope.patch('/api/sites/multiscreen/test_site/ecommerce/products/test_product', (body) => {
      expect(body).to.eql({ ...product})
      return body
    }).reply(200, product)

    return await duda.ecomm.products.update({ site_name: "test_site", product_id: "test_product", ...product })
  })

  it('can delete a product', async () => {
    scope.delete('/api/sites/multiscreen/test_site/ecommerce/products/test_product').reply(204)
    return await duda.ecomm.products.delete({ site_name: "test_site", product_id: "test_product" })
  })
})