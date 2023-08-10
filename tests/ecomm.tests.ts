import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Ecomm tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const site_name = "test_site";
  const product_id = "test_product";
  const gateway_id = "test_gateway";
  const cart_id = 'test_cart';

  const updateSettings = {
    default_currency: 'USD',
    business_name: 'My Great Company',
    business_address: {
      address_1: '123 Main St',
      city: 'Louisville',
      region: 'Colorado',
      country: 'US',
      postal_code: '80027'
    },
    time_zone: 'Mountain',
    enabled_countries: ['US'],
    send_email_notifications: true
  };

  const cartSettings = {
    "split_name_field": true,
    "split_address_1_field": true,
    "display_instruction_field": true,
    "display_phone_field": true
  };

  const settings = {
    default_currency: 'USD',
    business_name: 'My Great Company',
    business_address: {
      address_1: '123 Main St',
      city: 'Louisville',
      region: 'Colorado',
      country: 'US',
      postal_code: '80027'
    },
    time_zone: 'Mountain',
    enabled_countries: ['US'],
    send_email_notifications: true,
    cart_settings: cartSettings
  };

  const product = {
    description: "The most amazing t shirt ever sold",
    images: [
      {
        alt: "Image of fancy shirt",
        url: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"
      }
    ],
    name: "Amazing T-shirt",
    prices: [
      {
        compare_at_price: "19.99",
        currency: "USD",
        price: "12.34"
      }
    ],
    seo: {
      description: "Amazing T-shirt made with 100% biologic cotton",
      product_url: "amazing-t-shirt",
      title: "Amazing T-shirt"
    },
    sku: "UGG-BB-PUR-06",
  }

  const list_product = {
    limit: 0,
    offset: 0,
    results: [ product ],
    site_name: site_name,
    total_responses: 0
  }

  const status = 'IN_PROGRESS';
  const mode = 'LIVE';
  const cursor = 'string';
  const limit = 1;

  const cart = {
    id: "string",
    mode: mode,
    status: status,
    language: "string",
    email: "string",
    currency: "string",
    items: [
      {
        type: "PHYSICAL_PRODUCT",
        id: "string",
        added: "2023-09-06T18:09:28.653Z",
        product_id: "string",
        variation_id: "string",
        external_product_id: "string",
        external_variation_id: "string",
        name: "string",
        image: "string",
        options: [
          {
            name: "string",
            value: "string"
          }
        ],
        quantity: 0,
        shippable: true,
        plan: {
          frequency: "WEEKLY",
          id: "string",
          name: "string",
          price: {
            minor_unit_value: 0,
            value: 0,
            currency: {
              value: "string"
            }
          },
          type: "FREE"
        },
        unit_price: 0,
        unit_weight: 0,
        unit_dimensions: {
          height: 0,
          width: 0,
          length: 0
        },
        discounts: [
          {
            id: "string",
            name: "string",
            savings: 0,
            type: "RATE"
          }
        ],
        tax_code: "string",
        taxes: [
          {
            name: "string",
            rate: 0,
            amount: 0
          }
        ],
        total: 0,
        combined_weight: 0,
        metadata: "string"
      }
    ],
    billing_address: {
      first_name: "string",
      last_name: "string",
      full_name: "string",
      address_1: "string",
      address_2: "string",
      street_number: "string",
      street_name: "string",
      city: "string",
      sub_locality: "string",
      region: "string",
      country: "string",
      postal_code: "string",
      phone: "string"
    },
    shipping_address: {
      first_name: "string",
      last_name: "string",
      full_name: "string",
      address_1: "string",
      address_2: "string",
      street_number: "string",
      street_name: "string",
      city: "string",
      sub_locality: "string",
      region: "string",
      country: "string",
      postal_code: "string",
      phone: "string"
    },
    shipping_method: {
      name: "string",
      cost: 0
    },
    shipping_instructions: "string",
    discounts: [
      {
        id: "string",
        savings: 0,
        name: "string",
        type: "RATE"
      }
    ],
    tax_provider: "BUILT_IN",
    taxes: [
      {
        name: "string",
        amount: 0,
        rate: 0
      }
    ],
    subtotal: 0,
    total: 0,
    created: "2023-09-06T18:09:28.653Z",
    updated: "2023-09-06T18:09:28.653Z",
    user_agent: "string",
    ip_address: "string",
    metadata: "string"
  }

  const list_carts = {
    cursor: cursor,
    has_more_results: true,
    results: [cart]
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

  it('can update a gateway', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/payment-gateways/${gateway_id}`, (body) => {
      expect(body).to.eql(gateway)
      return body
    }).reply(200, gateway)

    return await duda.ecomm.gateways.update({ site_name, gateway_id, ...gateway })
  })

  it('can delete a gateway', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/payment-gateways/${gateway_id}`).reply(204);
    return await duda.ecomm.gateways.delete({ site_name, gateway_id });
  })

  it('can get the ecomm settings', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce`, (body) => {
      expect(body).to.eql(settings)
      return body
    }).reply(200, settings)

    return await duda.ecomm.get({ site_name, ...settings });
  })

  it('can update the ecomm settings', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce`, (body) => {
      expect(body).to.eql(updateSettings)
      return body
    }).reply(200, updateSettings)

    return await duda.ecomm.update({ site_name, ...updateSettings });
  })

  it('can list all carts', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/carts?status=${status}&mode=${mode}&cursor=${cursor}&limit=${limit}`).reply(200, list_carts)
    return await duda.ecomm.carts.list({
      site_name: site_name,
      status: status,
      mode: mode,
      cursor: cursor,
      limit: limit
    }).then(res => expect(res).to.eql(list_carts))
  })

  it('can get the specific cart', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/carts/${cart_id}`).reply(200, cart)

    return await duda.ecomm.carts.get({ site_name, cart_id })
      .then(res => expect(res).to.eql({ ...cart }))
  })
})