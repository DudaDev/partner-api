import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App store ecomm tests', () => {
  const base_path = '/api/integrationhub/application' 
  const site_name = 'test_site';
  const product_id = "test_product";
  const option_id = 'test_option';
  const choice_id = 'string';
  const order_id = 'test_order';
  const session_id = 'test_session';
  const gateway_id = "test_gateway";
  const cart_id = 'test_cart';

  const offset = 0;
  const sort = 'sort';
  const direction = 'asc';
  const limit = 1;

  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'

  const product = {
    custom_fields: [
      {
        id: "WMd1xylGrp",
        value: "string"
      }
    ],
    description: "The most amazing t shirt ever sold",
    external_id: "string",
    images: [
      {
        alt: "Image of fancy shirt",
        url: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"
      }
    ],
    managed_inventory: false,
    name: "Amazing T-shirt",
    options: [
      {
        choices: [
          {
            id: "db3je27rg7",
            value: "45"
          }
        ],
        id: "WMd1xylGrp",
        name: "Shirt size"
      }
    ],
    prices: [
      {
        compare_at_price: "19.99",
        currency: "USD",
        price: "12.34"
      }
    ],
    quantity: 25,
    requires_shipping: true,
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

  const product_response = {
    categories: [
      {
        id: "WMd1xylGrp",
        order: 0,
        title: "Men shoes"
      }
    ],
    custom_fields: [
      {
        id: "WMd1xylGrp",
        value: "string"
      }
    ],
    description: "The most amazing t shirt ever sold",
    external_id: "KTP9XGbSg2",
    id: "IakdKbiUiK",
    images: [
      {
        alt: "Image of fancy shirt",
        url: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"
      }
    ],
    managed_inventory: true,
    name: "Amazing T-shirt",
    options: [
      {
        choices: [
          {
            id: "db3je27rg7",
            value: "45"
          }
        ],
        id: "WMd1xylGrp",
        name: "Shirt size"
      }
    ],
    prices: [
      {
        compare_at_price: "19.99",
        currency: "USD",
        price: "12.34"
      }
    ],
    quantity: 25,
    requires_shipping: true,
    seo: {
      description: "Amazing T-shirt made with 100% biologic cotton",
      product_url: "amazing-t-shirt",
      title: "Amazing T-shirt"
    },
    sku: "UGG-BB-PUR-06",
    status: "HIDDEN",
    stock_status: "IN_STOCK, OUT_OF_STOCK",
    type: "PHYSICAL",
    variations: [
      {
        external_id: "KTP9XGbSg2",
        id: "KTP9XGbSg2",
        images: [
          {
            alt: "Image of fancy shirt",
            url: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"
          }
        ],
        options: [
          {
            choice_id: "db3je27rg7",
            choice_value: "45",
            option_id: "WMd1xylGrp",
            option_name: "Shirt size"
          }
        ],
        price_difference: "string",
        quantity: 25,
        sku: "UGG-BB-PUR-06",
        status: "HIDDEN"
      }
    ]
  }

  const update_product_payload = {
    categories: [
      {
        id: "WMd1xylGrp",
        order: 0,
        title: "Men shoes"
      }
    ],
    custom_fields: [
      {
        id: "WMd1xylGrp",
        value: "string"
      }
    ],
    description: "The most amazing t shirt ever sold",
    external_id: "KTP9XGbSg2",
    id: "IakdKbiUiK",
    images: [
      {
        alt: "Image of fancy shirt",
        url: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"
      }
    ],
    managed_inventory: true,
    name: "Amazing T-shirt",
    options: [
      {
        choices: [
          {
            id: "db3je27rg7",
            value: "45"
          }
        ],
        id: "WMd1xylGrp",
        name: "Shirt size"
      }
    ],
    prices: [
      {
        compare_at_price: "19.99",
        currency: "USD",
        price: "12.34"
      }
    ],
    quantity: 25,
    requires_shipping: true,
    seo: {
      description: "Amazing T-shirt made with 100% biologic cotton",
      product_url: "amazing-t-shirt",
      title: "Amazing T-shirt"
    },
    sku: "UGG-BB-PUR-06",
    variations: [
      {
        external_id: "KTP9XGbSg2",
        id: "KTP9XGbSg2",
        images: [
          {
            alt: "Image of fancy shirt",
            url: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"
          }
        ],
        options: [
          {
            choice_id: "db3je27rg7",
            choice_value: "45",
            option_id: "WMd1xylGrp",
            option_name: "Shirt size"
          }
        ],
        price_difference: "string",
        quantity: 25,
        sku: "UGG-BB-PUR-06",
        status: "HIDDEN"
      }
    ]
  }

  const choices = {
    id: 'string',
    value: 'string'
  }

  const product_option = {
    choices: [choices],
    id: 'string',
    name: 'string'
  }

  const list_product_option_response = {
    limit: 0,
    offset: 0,
    results: [product_option],
    site_name: site_name,
    total_responses: 0
  }

  const create_product_option_payload = {
    choices: ['string'],
    name: 'string'
  }

  const address = {
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
  }

  const order = {
    source: "CHECKOUT",
    mode: "LIVE",
    id: "string",
    external_id: "string",
    status: "IN_PROGRESS",
    email: "string",
    invoice_number: "string",
    items: [
      {
        id: "string",
        product_id: "string",
        variation_id: "string",
        external_product_id: "string",
        external_variation_id: "string",
        name: "string",
        image: "string",
        sku: "string",
        options: [
          {
            name: "string",
            value: "string"
          }
        ],
        quantity: 0,
        shippable: true,
        unit_price: 0,
        unit_weight: 0,
        unit_dimensions: {
          height: 0,
          width: 0,
          length: 0
        },
        total: 0,
        combined_weight: 0,
        metadata: "string"
      }
    ],
    billing_address: address,
    shipping_address: address,
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
        type: "string"
      }
    ],
    taxes: [
      {
        name: "string",
        amount: 0,
        rate: 0
      }
    ],
    subtotal: 0,
    total: 0,
    payment: {
      transaction_id: "string",
      status: "PAID",
      currency: "string",
      method: "string",
      card_brand: "NULL",
      card_last_4: "string"
    },
    refunds: [
      {}
    ],
    tracking_url: "string",
    tracking_number: "string",
    created: "2023-09-08T17:48:47.497Z",
    user_agent: "string",
    ip_address: "string",
    metadata: "string"
  }

  const list_orders = {
    offset: offset,
    limit: limit,
    total_response: 0,
    results: [order]
  }

  const update_order_item = {
    id: "string",
    metadata: "string"
  }

  const update_order_payload = {
    email: "string",
    items: [update_order_item],
    billing_address: address,
    shipping_address: address,
    shipping_instructions: "string",
    metadata: "string"
  }

  const payment_session = {
    id: "string",
    mode: "LIVE",
    cancel_url: "string",
    invoice: {
      purchase_id: "string",
      purchase_type: "string",
      email: "string",
      language: "string",
      currency: "string",
      total: 0,
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
      items: [
        {
          type: "PHYSICAL",
          name: "string",
          unit_price: 0,
          quantity: 0,
          discount_amount: 0,
          total: 0
        }
      ]
    },
    site_name: "string",
    site_external_id: "string"
  }

  const confirm_payment_body = {
    transaction_id: "string",
    icon: "string",
    name: "string",
    instructions: "string",
    links: {
      refunds: "string"
    },
  }

  const payment_url = {
    return_url: "string"
  }

  const gateway = {
    live_payment_methods_url: 'https://example.org/path/to/gateway',
    test_payment_methods_url: 'https://test.example.org/path/to/gateway'
  }

  const status = 'IN_PROGRESS';
  const mode = 'LIVE';
  const cursor = 'string';

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

  const cartSettings = {
    split_name_field: true,
    split_address_1_field: true,
    display_instruction_field: true,
    display_phone_field: true
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

  let duda: Duda;
  let scope: nock.Scope;

  before(() => {
    duda = new Duda({
      user,
      pass,
      env: Duda.Envs.direct,
    })

    scope = nock('https://api.duda.co', {
      reqheaders: {
        'x-duda-access-token': `Bearer ${token}`
      }
    })
  })

  it('can list all products', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/products`).reply(200, list_product)
    return await duda.appstore.ecomm.products.list({
      site_name: site_name,
      token
    }).then(res => expect(res).to.eql(list_product))
  })

  it('can create a product', async () => {
    scope.post(`${base_path}/site/${site_name}/ecommerce/products`, (body) => {
      expect(body).to.eql({ status: 'HIDDEN', stock_status: 'IN_STOCK', type: 'PHYSICAL', ...product })
      return body
    }).reply(200, product_response)

    return await duda.appstore.ecomm.products.create({ site_name, token, status: 'HIDDEN', stock_status: 'IN_STOCK', type: 'PHYSICAL', ...product })
  })

  it('can get a product', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/products/${product_id}`).reply(200, product_response)

    return await duda.appstore.ecomm.products.get({ site_name, product_id, token })
      .then(res => expect(res).to.eql({ ...product_response }))
  })

  it('can update a product', async () => {
    scope.patch(`${base_path}/site/${site_name}/ecommerce/products/${product_id}`, (body) => {
      expect(body).to.eql({ status: 'HIDDEN', stock_status: 'IN_STOCK', ...update_product_payload })
      return body
    }).reply(200, product_response)

    return await duda.appstore.ecomm.products.update({ site_name, product_id, token, status: 'HIDDEN', stock_status: 'IN_STOCK', ...update_product_payload })
  })

  it('can delete a product', async () => {
    scope.delete(`${base_path}/site/${site_name}/ecommerce/products/${product_id}`).reply(204)
    return await duda.appstore.ecomm.products.delete({ site_name, product_id, token })
  })

  it('can list all product options', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/options?limit=0&offset=0&sort=string&direction=asc`).reply(200, list_product_option_response)
    return await duda.appstore.ecomm.options.list({
      site_name: site_name,
      limit: 0,
      offset: 0,
      sort: 'string',
      direction: 'asc',
      token
    }).then(res => expect(res).to.eql(list_product_option_response))
  })

  it('can create a product option', async () => {
    scope.post(`${base_path}/site/${site_name}/ecommerce/options`, (body) => {
      expect(body).to.eql({ ...create_product_option_payload })
      return body
    }).reply(200, product_option)

    return await duda.appstore.ecomm.options.create({ site_name, token, ...create_product_option_payload })
  })

  it('can get a product option', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/options/${option_id}`).reply(200, product_option)

    return await duda.appstore.ecomm.options.get({ site_name, option_id, token })
      .then(res => expect(res).to.eql({ ...product_option }))
  })

  it('can update a product option', async () => {
    scope.put(`${base_path}/site/${site_name}/ecommerce/options/${option_id}`, (body) => {
      expect(body).to.eql({ name: 'string' })
      return body
    }).reply(200, product_option)

    return await duda.appstore.ecomm.options.update({ site_name, option_id, token, name: 'string' })
  })

  it('can delete a product option', async () => {
    scope.delete(`${base_path}/site/${site_name}/ecommerce/options/${option_id}`).reply(204)
    return await duda.appstore.ecomm.options.delete({ site_name, option_id, token })
  })

  it('can create a product option choice', async () => {
    scope.post(`${base_path}/site/${site_name}/ecommerce/options/${option_id}/choices`, (body) => {
      expect(body).to.eql({ value: 'string' })
      return body
    }).reply(200, product_option)

    return await duda.appstore.ecomm.options.createChoice({ site_name, option_id, token, value: 'string' })
  })

  it('can update a product option choice', async () => {
    scope.put(`${base_path}/site/${site_name}/ecommerce/options/${option_id}/choices/${choice_id}`, (body) => {
      expect(body).to.eql({ value: 'string' })
      return body
    }).reply(200, product_option)

    return await duda.appstore.ecomm.options.updateChoice({ site_name, option_id, choice_id, token, value: 'string' })
  })

  it('can delete a product option choice', async () => {
    scope.delete(`${base_path}/site/${site_name}/ecommerce/options/${option_id}/choices/${choice_id}`).reply(204)
    return await duda.appstore.ecomm.options.deleteChoice({ site_name, option_id, choice_id, token })
  })

  it('can list all orders', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/orders?offset=${offset}&limit=${limit}&sort=${sort}&direction=${direction}`).reply(200, list_orders)
    return await duda.appstore.ecomm.orders.list({
      site_name: site_name,
      offset: offset,
      limit: limit,
      sort: sort,
      direction: direction,
      token: token
    }).then(res => expect(res).to.eql(list_orders))
  })

  it('can get a specific order', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/orders/${order_id}`).reply(200, order)

    return await duda.appstore.ecomm.orders.get({ site_name, order_id, token })
      .then(res => expect(res).to.eql({ ...order }))
  })

  it('can update an order', async () => {
    scope.patch(`${base_path}/site/${site_name}/ecommerce/orders/${order_id}`, (body) => {
      expect(body).to.eql({ status: 'IN_PROGRESS', ...update_order_payload })
      return body
    }).reply(200, order)

    return await duda.appstore.ecomm.orders.update({ site_name, order_id, token, status: 'IN_PROGRESS', ...update_order_payload })
  })

  it('can get a payment session', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/payment-sessions/${session_id}`).reply(200, payment_session)
    return await duda.appstore.ecomm.payments.get({
      site_name: site_name,
      session_id: session_id,
      token: token
    }).then(res => expect(res).to.eql(payment_session))
  })

  it('can confirm the payment session', async () => {
    scope.post(`${base_path}/site/${site_name}/ecommerce/payment-sessions/${session_id}/confirm`, (body) => {
      expect(body).to.eql({ state: 'PROCESSED', ...confirm_payment_body })
      return body
    }).reply(200, payment_url)

    return await duda.appstore.ecomm.payments.confirm({ site_name, session_id, token, state: 'PROCESSED', ...confirm_payment_body })
  })

  it('can create a gateway', async () => {
    scope.post(`${base_path}/site/${site_name}/ecommerce/payment-gateways`, (body) => {
      expect(body).to.eql({ ...gateway })
      return body
    }).reply(201, { id: 'abc123', ...gateway })

    return await duda.appstore.ecomm.gateways.create({ site_name, token, ...gateway })
  })

  it('can get a gateway', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/payment-gateways/${gateway_id}`)
      .reply(200, { gateway_id, ...gateway })

    return await duda.appstore.ecomm.gateways.get({ site_name, gateway_id, token })
  })

  it('can list all gateways', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/payment-gateways`)
      .reply(200, [ {gateway_id, ...gateway} ])

    return await duda.appstore.ecomm.gateways.list({ site_name, token })
  })

  it('can update a gateway', async () => {
    scope.patch(`${base_path}/site/${site_name}/ecommerce/payment-gateways/${gateway_id}`, (body) => {
      expect(body).to.eql(gateway)
      return body
    }).reply(200, gateway)

    return await duda.appstore.ecomm.gateways.update({ site_name, gateway_id, token, ...gateway })
  })

  it('can delete a gateway', async () => {
    scope.delete(`${base_path}/site/${site_name}/ecommerce/payment-gateways/${gateway_id}`).reply(204);
    return await duda.appstore.ecomm.gateways.delete({ site_name, gateway_id, token });
  })

  it('can get the ecomm settings', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce`)
      .reply(200, settings)

    return await duda.appstore.ecomm.get({ site_name, token })
  })

  it('can update the ecomm settings', async () => {
    scope.patch(`${base_path}/site/${site_name}/ecommerce`, (body) => {
      expect(body).to.eql(settings)
      return body
    }).reply(200, settings)

    return await duda.appstore.ecomm.update({ site_name, token, ...settings })
  })

  it('can list all carts', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/carts?status=${status}&mode=${mode}&cursor=${cursor}&limit=${limit}`).reply(200, list_carts)
    return await duda.appstore.ecomm.carts.list({
      site_name: site_name,
      status: status,
      mode: mode,
      cursor: cursor,
      limit: limit,
      token: token
    }).then(res => expect(res).to.eql(list_carts))
  })

  it('can get the specific cart', async () => {
    scope.get(`${base_path}/site/${site_name}/ecommerce/carts/${cart_id}`).reply(200, cart)

    return await duda.appstore.ecomm.carts.get({ site_name, cart_id, token })
      .then(res => expect(res).to.eql({ ...cart }))
  })
})