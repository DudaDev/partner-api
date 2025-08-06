import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Ecomm tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const site_name = 'test_site';
  const product_id = 'test_product';
  const gateway_id = 'test_gateway';
  const cart_id = 'test_cart';
  const group_id = 'test_group';
  const zone_id = 'test_zone';
  const rate_id = 'test_rate';
  const order_id = 'test_order';
  const refund_id = 'test_refund';
  const fulfillment_id = 'fulfil_test';
  const session_id = 'test_session';
  const category_id = 'test_category';
  const shipping_id = 'test_shipping';
  const option_id = 'test_option';
  const choice_id = 'test_choice';
  const variation_id = 'test_variation';

  const offset = 0;
  const limit = 1;
  const sort = 'sort';
  const direction = 'asc';

  const store = {
    max_choice_per_option: 0,
    max_variation_per_product: 0,
    max_options: 0,
    max_products: 0,
  }

  const store_return = {
    site_name,
    features: store
  }

  const cart_settings = {
    split_name_field: true,
    split_address_1_field: true,
    display_instruction_field: true,
    display_phone_field: true,
    terms_and_conditions_html: 'string',
    marketing_opt_in_settings: {
      enabled: true,
      description_html: 'string'
    }
  }

  const tax_settings = {
    calculation_mode: 'TAXES_EXCLUDED_FROM_PRICE',
    default_tax_zone_id: 'string'
  }

  const tax_group = {
    name: 'string',
    product_ids: ['string']
  }

  const tax_group_results = {
    id: 'string',
    name: 'string',
    product_ids: ['string']
  }

  const list_tax_groups_response = {
    offset: 0,
    limit: 0,
    total_responses: 1,
    results: [ tax_group_results ]
  }

  const tax_rate = {
    name: 'string',
    rate: '0',
    tax_number_for_invoice: 'string',
    tax_group_overrides: {
      "prop1": 0
    }
  }

  const tax_rate_results = {
    id: 'string',
    name: 'string',
    rate: '0',
    tax_number_for_invoice: 'string',
    tax_group_overrides: {
      "prop1": 0
    }
  }

  const tax_zone = {
    country: 'string',
    region: 'string',
    rates: [tax_rate]
  }

  const tax_zone_results = {
    id: 'string',
    country: 'string',
    region: 'string',
    rates: [tax_rate_results]
  }

  const list_tax_zone_results = {
    offset: 0,
    limit: 0,
    total_responses: 1,
    results: [tax_zone]
  }

  const list_tax_zone_rate_results = {
    offset: 0,
    limit: 0,
    total_responses: 1,
    results: [tax_rate_results]
  }

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
    enabled_countries: ['US'],
    send_email_notifications: true,
    cart_settings: cart_settings,
    tax_settings: tax_settings,
    contact_email: 'string',
    contact_name: 'string',
    show_lowest_price: true,
    measurement_system: 'IMPERIAL'
  };

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
    site_name,
    total_responses: 1
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

  const status = 'IN_PROGRESS';
  const mode = 'LIVE';
  const cursor = 'string';

  const cart = {
    id: "string",
    mode,
    status,
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
    cursor,
    has_more_results: true,
    results: [cart]
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
    offset,
    limit,
    total_response: 0,
    results: [order]
  }

  const create_order_options = {
    name: "string",
    value: "string"
  }

  const create_order_item = {
    product_id: "string",
    variation_id: "string",
    external_product_id: "string",
    external_variation_id: "string",
    name: "string",
    image: "string",
    options: [create_order_options],
    quantity: 1,
    unit_price: 1,
    unit_dimensions: {
      height: 0,
      width: 0,
      length: 0
    },
  }

  const create_order_payload = {
    curreny: "string",
    invoice_number: "string",
    email: "string",
    items: [create_order_item],
    billing_address: address,
    shipping_address: address,
    shipping_instructions: "string",
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

  const refund = {
    id: "string",
    order_id,
    transaction_id: "string",
    reason: "string",
    items: [
      {
        id: "string",
        quantity: 0,
        amount: 0,
        taxes: [
          {
            id: "string",
            name: "string",
            rate: 0,
            amount: 0,
            provider: "BUILT_IN"
          }
        ]
      }
    ],
    currency: "string",
    tax_provider: {
      provider: "BUILT_IN",
      avalara_reference_id: "string"
    },
    subtotal: 0,
    taxes: [
      {
        id: "string",
        name: "string",
        rate: 0,
        amount: 0,
        provider: "BUILT_IN"
      }
    ],
    total: 0,
    created: "2024-04-18T18:56:53.920Z"
  }

  const list_refunds = {
    offset,
    limit,
    total_response: 0,
    results: [refund]
  }

  const create_refund_payload = {
    reason: "string",
    notify_customer: true,
    items: [
      {
        id: "string",
        quantity: 0
      }
    ]
  }

  const fulfillment = {
    id: "fulfil_test",
    status: "FULFILLED",
    method: "SHIPMENT",
    items: [
      {
        id: "item_123",
        quantity: 2
      }
    ],
    tracking: {
      carrier: "Canada Post",
      number: "12345",
      url: "https://example.com/12345"
    }
  }

  const list_fulfillments = {
    offset,
    limit,
    total_response: 1,
    results: [fulfillment]
  }

  const create_order_fulfillment_payload = {
    status: "FULFILLED",
    method: "SHIPMENT",
    items: [
      {
        id: "item_123",
        quantity: 2
      }
    ],
    tracking: {
      carrier: "Canada Post",
      number: "12345",
      url: "https://example.com/12345"
    }
  }

  const update_order_fulfillment_payload = {
    status: "FULFILLED",
    tracking: {
      carrier: "Canada Post",
      number: "12345",
      url: "https://example.com/12345"
    }
  }

  const gateway = {
    live_payment_methods_url: 'https://example.org/path/to/gateway',
    test_payment_methods_url: 'https://test.example.org/path/to/gateway',
    management_url: 'https://management.example.org/path/to/gateway'
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

  const category = {
    id: 'string',
    title: 'string',
    order: 0,
    parent_id: 'string',
    products_count: 'string'
  }

  const list_category_response = {
    offset: 0,
    limit: 0,
    total_response: 0,
    site_name,
    results: [category]
  }

  const category_payload = {
    description: 'description',
    image: {
      alt: 'string',
      url: 'string'
    },
    parent_id: 'string',
    products: [
      {
        id: 'string'
      }
    ],
    seo: {
      description: 'string',
      title: 'string',
      url: 'string'
    },
    subcategories: [
      {
        id: 'string'
      }
    ],
    title: 'string'
  }

  const category_response = {
    description: 'string',
    id: 'string',
    image: {
      alt: 'string',
      url: 'string'
    },
    parent_id: 'string',
    products: [
      {
        id: 'string',
        name: 'string',
        order: 0
      }
    ],
    seo: {
      description: 'string',
      title: 'string',
      url: 'string'
    },
    subcategories: [
      {
        id: 'string',
        order: 0,
        title: 'string'
      }
    ],
    title: 'string'
  }

  const shipping_provider = {
    id: shipping_id,
    live_shipping_rates_url: 'string',
    test_shipping_rates_url: 'string'
  }

  const shipping_providers_list = {
    offset: 0,
    limit: 0,
    total_responses: 0,
    results: [shipping_provider]
  }

  const shipping_payload = {
    live_shipping_rates_url: 'string',
    test_shipping_rates_url: 'string'
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
    site_name,
    total_responses: 1
  }

  const create_product_option_payload = {
    choices: ['string'],
    name: 'string'
  }

  const variation_response = {
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

  const update_variation_payload = {
    external_id: "string",
    images: [
      {
        alt: "Image of fancy shirt",
        url: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"
      }
    ],
    price_difference: "string",
    quantity: 25,
    sku: "UGG-BB-PUR-06",
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
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/products?limit=0&offset=0&sort=sort&direction=asc`).reply(200, list_product)
    return await duda.ecomm.products.list({
      site_name,
      limit: 0,
      offset: 0,
      sort: 'sort',
      direction: 'asc'
    }).then(res => expect(res).to.eql(list_product))
  })

  it('can create a product', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/products`, (body) => {
      expect(body).to.eql({ status: 'HIDDEN', stock_status: 'IN_STOCK', type: 'PHYSICAL', ...product })
      return body
    }).reply(200, product_response)

    return await duda.ecomm.products.create({ site_name, status: 'HIDDEN', stock_status: 'IN_STOCK', type: 'PHYSICAL', ...product })
  })

  it('can get a product', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/products/${product_id}`).reply(200, product_response)

    return await duda.ecomm.products.get({ site_name, product_id })
      .then(res => expect(res).to.eql({ ...product_response }))
  })

  it('can update a product', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/products/${product_id}`, (body) => {
      expect(body).to.eql({ status: 'HIDDEN', stock_status: 'IN_STOCK', ...update_product_payload})
      return body
    }).reply(200, product_response)

    return await duda.ecomm.products.update({ site_name, product_id, status: 'HIDDEN', stock_status: 'IN_STOCK', ...update_product_payload })
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
      expect(body).to.eql(settings)
      return body
    }).reply(200, settings)

    return await duda.ecomm.update({ site_name, ...settings })
  })

  it('can list all carts', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/carts?status=${status}&mode=${mode}&cursor=${cursor}&limit=${limit}`).reply(200, list_carts)
    return await duda.ecomm.carts.list({
      site_name,
      status,
      mode,
      cursor,
      limit
    }).then(res => expect(res).to.eql(list_carts))
  })

  it('can get the specific cart', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/carts/${cart_id}`).reply(200, cart)

    return await duda.ecomm.carts.get({ site_name, cart_id })
      .then(res => expect(res).to.eql({ ...cart }))
  })

  it('can list all tax groups', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/tax-groups?limit=0&offset=0&direction=asc`).reply(200, list_tax_groups_response)
    return await duda.ecomm.groups.list({
      site_name,
      limit: 0,
      offset: 0,
      direction: 'asc'
    }).then(res => expect(res).to.eql(list_tax_groups_response))
  })

  it('can create a tax group', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/tax-groups`, (body) => {
      expect(body).to.eql({ ...tax_group_results})
      return body
    }).reply(201, tax_group)

    return await duda.ecomm.groups.create({ site_name, ...tax_group_results })
  })

  it('can get a tax group', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/tax-groups/${group_id}`).reply(200, tax_group)

    return await duda.ecomm.groups.get({ site_name, group_id })
      .then(res => expect(res).to.eql({ ...tax_group }))
  })

  it('can update a tax group', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/tax-groups/${group_id}`, (body) => {
      expect(body).to.eql({ ...tax_group})
      return body
    }).reply(200, tax_group)

    return await duda.ecomm.groups.update({ site_name, group_id, ...tax_group })
  })

  it('can delete a tax group', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/tax-groups/${group_id}`).reply(204)
    return await duda.ecomm.groups.delete({ site_name, group_id })
  })

  it('can list all tax zones', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones?limit=0&offset=0&direction=asc`).reply(200, list_tax_zone_results)
    return await duda.ecomm.zones.list({
      site_name,
      limit: 0,
      offset: 0,
      direction: 'asc'
    }).then(res => expect(res).to.eql(list_tax_zone_results))
  })

  it('can create a tax zone', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones`, (body) => {
      expect(body).to.eql({ ...tax_zone})
      return body
    }).reply(201, tax_zone_results)

    return await duda.ecomm.zones.create({ site_name, ...tax_zone })
  })

  it('can get a tax zone', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones/${zone_id}`).reply(200, tax_zone_results)

    return await duda.ecomm.zones.get({ site_name, zone_id })
      .then(res => expect(res).to.eql({ ...tax_zone_results }))
  })

  it('can update a tax zone', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones/${zone_id}`, (body) => {
      expect(body).to.eql({ ...[tax_rate]})
      return body
    }).reply(200, tax_zone_results)

    return await duda.ecomm.zones.update({ site_name, zone_id, ...[tax_rate] })
  })

  it('can delete a tax zone', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones/${zone_id}`).reply(204)
    return await duda.ecomm.zones.delete({ site_name, zone_id })
  })

  it('can list all tax zone rates', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones/${zone_id}/rates?limit=0&offset=0&direction=asc`).reply(200, list_tax_zone_rate_results)
    return await duda.ecomm.zones.listRate({
      site_name,
      zone_id,
      limit: 0,
      offset: 0,
      direction: 'asc'
    }).then(res => expect(res).to.eql(list_tax_zone_rate_results))
  })

  it('can create a tax zone rate', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones/${zone_id}/rates`, (body) => {
      expect(body).to.eql({ ...tax_rate})
      return body
    }).reply(201, tax_rate_results)

    return await duda.ecomm.zones.createRate({ site_name, zone_id, ...tax_rate })
  })

  it('can get a tax zone rate', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones/${zone_id}/rates/${rate_id}`).reply(200, tax_rate_results)

    return await duda.ecomm.zones.getRate({ site_name, zone_id, rate_id })
      .then(res => expect(res).to.eql({ ...tax_rate_results }))
  })

  it('can update a tax zone rate', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones/${zone_id}/rates/${rate_id}`, (body) => {
      expect(body).to.eql({ ...tax_rate})
      return body
    }).reply(200, tax_rate_results)

    return await duda.ecomm.zones.updateRate({ site_name, zone_id, rate_id, ...tax_rate })
  })

  it('can delete a tax zone rate', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/tax-zones/${zone_id}/rates/${rate_id}`).reply(204)
    return await duda.ecomm.zones.deleteRate({ site_name, zone_id, rate_id })
  })

  it('can list all orders', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/orders?offset=${offset}&limit=${limit}&sort=${sort}&direction=${direction}`).reply(200, list_orders)
    return await duda.ecomm.orders.list({
      site_name,
      offset,
      limit,
      sort,
      direction
    }).then(res => expect(res).to.eql(list_orders))
  })

  it('can get a specific order', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}`).reply(200, order)

    return await duda.ecomm.orders.get({ site_name, order_id })
      .then(res => expect(res).to.eql({ ...order }))
  })

  it('can create an external order', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/orders`, (body) => {
      expect(body).to.eql({ mode: 'LIVE', status: 'IN_PROGRESS', ...create_order_payload })
      return body
    }).reply(200, order)

    return await duda.ecomm.orders.create({ site_name, mode: 'LIVE', status: 'IN_PROGRESS', ...create_order_payload })
  })

  it('can update an order', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}`, (body) => {
      expect(body).to.eql({ status: 'IN_PROGRESS', ...update_order_payload })
      return body
    }).reply(200, order)

    return await duda.ecomm.orders.update({ site_name, order_id, status: 'IN_PROGRESS', ...update_order_payload })
  })

  it('can list all refunds (DEPRECATED)', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/refunds?offset=${offset}&limit=${limit}&sort=${sort}&direction=${direction}`).reply(200, list_refunds)
    return await duda.ecomm.orders.listRefund({
      site_name,
      order_id,
      offset,
      limit,
      sort,
      direction
    }).then(res => expect(res).to.eql(list_refunds))
  })

  it('can get a specific refund (DEPRECATED)', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/refunds/${refund_id}`).reply(200, refund)

    return await duda.ecomm.orders.getRefund({ site_name, order_id, refund_id })
      .then(res => expect(res).to.eql({ ...refund }))
  })

  it('can list all refunds', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/refunds?offset=${offset}&limit=${limit}&sort=${sort}&direction=${direction}`).reply(200, list_refunds)
    return await duda.ecomm.orders.refunds.list({
      site_name,
      order_id,
      offset,
      limit,
      sort,
      direction
    }).then(res => expect(res).to.eql(list_refunds))
  })

  it('can get a specific refund', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/refunds/${refund_id}`).reply(200, refund)

    return await duda.ecomm.orders.refunds.get({ site_name, order_id, refund_id })
      .then(res => expect(res).to.eql({ ...refund }))
  })

  it('can create a refund', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/refunds`, (body) => {
      expect(body).to.eql({ ...create_refund_payload })
      return body
    }).reply(201, refund)

    return await duda.ecomm.orders.refunds.create({ site_name, order_id, ...create_refund_payload })
  })

  it('can list all order fulfillments', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/fulfillments?offset=${offset}&limit=${limit}&sort=${sort}&direction=${direction}`).reply(200, list_fulfillments)
    return await duda.ecomm.orders.fulfillments.list({
      site_name,
      order_id,
      offset,
      limit,
      sort,
      direction
    }).then(res => expect(res).to.eql(list_fulfillments))
  })

  it('can get a specific order fulfillment', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/fulfillments/${fulfillment_id}`).reply(200, fulfillment)
    return await duda.ecomm.orders.fulfillments.get({ site_name, order_id, fulfillment_id })
      .then(res => expect(res).to.eql({ ...fulfillment }))
  })

  it('can create an order fulfillment', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/fulfillments`, (body) => {
      expect(body).to.eql({ ...create_order_fulfillment_payload })
      return body
    }).reply(201, fulfillment)

    return await duda.ecomm.orders.fulfillments.create({ site_name, order_id, ...create_order_fulfillment_payload })
  })

  it('can update an order fulfillment', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/orders/${order_id}/fulfillments/${fulfillment_id}`, (body) => {
      expect(body).to.eql({ ...update_order_fulfillment_payload })
      return body
    }).reply(200, fulfillment)

    return await duda.ecomm.orders.fulfillments.update({ site_name, order_id, fulfillment_id, ...update_order_fulfillment_payload })
  })

  it('can get a payment session', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/payment-sessions/${session_id}`).reply(200, payment_session)
    return await duda.ecomm.payments.get({
      site_name,
      session_id
    }).then(res => expect(res).to.eql(payment_session))
  })

  it('can confirm the payment session', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/payment-sessions/${session_id}/confirm`, (body) => {
      expect(body).to.eql({ state: 'PROCESSED', ...confirm_payment_body })
      return body
    }).reply(200, payment_url)

    return await duda.ecomm.payments.confirm({ site_name, session_id, state: 'PROCESSED', ...confirm_payment_body })
  })

  it('can get all categories', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/categories?limit=0&offset=0&sort=title`).reply(200, list_category_response)
    return await duda.ecomm.categories.list({
      site_name,
      limit: 0,
      offset: 0,
      sort: 'title'
    }).then(res => expect(res).to.eql(list_category_response))
  })

  it('can create a category', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/categories`, (body) => {
      expect(body).to.eql({ ...category_payload })
      return body
    }).reply(200, category_response)

    return await duda.ecomm.categories.create({ site_name, ...category_payload })
  })

  it('can get a category', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/categories/${category_id}`).reply(200, category_response)

    return await duda.ecomm.categories.get({ site_name, category_id })
      .then(res => expect(res).to.eql({ ...category_response }))
  })

  it('can update a category', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/categories/${category_id}`, (body) => {
      expect(body).to.eql({ ...category_payload})
      return body
    }).reply(200, category_response)

    return await duda.ecomm.categories.update({ site_name, category_id, ...category_payload })
  })

  it('can delete a category', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/categories/${category_id}`).reply(200)
    return await duda.ecomm.categories.delete({ site_name, category_id })
  })

  it('can list all shipping providers', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/shipping-providers`).reply(200, shipping_providers_list)
    return await duda.ecomm.shipping.list({
      site_name
    }).then(res => expect(res).to.eql(shipping_providers_list))
  })

  it('can create a shipping provider', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/shipping-providers`, (body) => {
      expect(body).to.eql({ ...shipping_payload })
      return body
    }).reply(201, shipping_provider)

    return await duda.ecomm.shipping.create({ site_name, ...shipping_payload })
  })

  it('can get a shipping provider', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/shipping-providers/${shipping_id}`).reply(200, shipping_provider)

    return await duda.ecomm.shipping.get({ site_name, id: shipping_id })
      .then(res => expect(res).to.eql({ ...shipping_provider }))
  })

  it('can update a shipping provider', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/shipping-providers/${shipping_id}`, (body) => {
      expect(body).to.eql({ ...shipping_payload})
      return body
    }).reply(200, shipping_provider)

    return await duda.ecomm.shipping.update({ site_name, id: shipping_id, ...shipping_payload })
  })

  it('can delete a shipping provider', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/shipping-providers/${shipping_id}`).reply(204)
    return await duda.ecomm.shipping.delete({ site_name, id: shipping_id })
  })

  it('can list all product options', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/options?limit=0&offset=0&sort=string&direction=asc`).reply(200, list_product_option_response)
    return await duda.ecomm.options.list({
      site_name,
      limit: 0,
      offset: 0,
      sort: 'string',
      direction: 'asc'
    }).then(res => expect(res).to.eql(list_product_option_response))
  })

  it('can create a product option', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/options`, (body) => {
      expect(body).to.eql({ ...create_product_option_payload })
      return body
    }).reply(200, product_option)

    return await duda.ecomm.options.create({ site_name, ...create_product_option_payload })
  })

  it('can get a product option', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}`).reply(200, product_option)

    return await duda.ecomm.options.get({ site_name, option_id })
      .then(res => expect(res).to.eql({ ...product_option }))
  })

  it('can update a product option', async () => {
    scope.put(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}`, (body) => {
      expect(body).to.eql({ name: 'string' })
      return body
    }).reply(200, product_option)

    return await duda.ecomm.options.update({ site_name, option_id, name: 'string' })
  })

  it('can delete a product option', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}`).reply(204)
    return await duda.ecomm.options.delete({ site_name, option_id })
  })

  it('can create a product option choice (DEPRECATED)', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}/choices`, (body) => {
      expect(body).to.eql({ value: 'string' })
      return body
    }).reply(200, product_option)

    return await duda.ecomm.options.createChoice({ site_name, option_id, value: 'string' })
  })

  it('can update a product option choice (DEPRECATED)', async () => {
    scope.put(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}/choices/${choice_id}`, (body) => {
      expect(body).to.eql({ value: 'string' })
      return body
    }).reply(200, product_option)

    return await duda.ecomm.options.updateChoice({ site_name, option_id, choice_id, value: 'string' })
  })

  it('can delete a product option choice (DEPRECATED)', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}/choices/${choice_id}`).reply(204)
    return await duda.ecomm.options.deleteChoice({ site_name, option_id, choice_id })
  })

  it('can create a product option choice', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}/choices`, (body) => {
      expect(body).to.eql({ value: 'string' })
      return body
    }).reply(200, product_option)

    return await duda.ecomm.options.choices.create({ site_name, option_id, value: 'string' })
  })

  it('can update a product option choice', async () => {
    scope.put(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}/choices/${choice_id}`, (body) => {
      expect(body).to.eql({ value: 'string' })
      return body
    }).reply(200, product_option)

    return await duda.ecomm.options.choices.update({ site_name, option_id, choice_id, value: 'string' })
  })

  it('can delete a product option choice', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/options/${option_id}/choices/${choice_id}`).reply(204)
    return await duda.ecomm.options.choices.delete({ site_name, option_id, choice_id })
  })

  it('can get a product variation', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/products/${product_id}/variations/${variation_id}`).reply(200, variation_response)

    return await duda.ecomm.variations.get({ site_name, product_id, variation_id })
      .then(res => expect(res).to.eql({ ...variation_response }))
  })

  it('can update a product variation', async () => {
    scope.patch(`/api/sites/multiscreen/${site_name}/ecommerce/products/${product_id}/variations/${variation_id}`, (body) => {
      expect(body).to.eql({ status: 'HIDDEN', ...update_variation_payload})
      return body
    }).reply(200, variation_response)

    return await duda.ecomm.variations.update({ site_name, product_id, variation_id, status: 'HIDDEN', ...update_variation_payload })
  })

  it('can get store', async () => {
    scope.get(`/api/sites/multiscreen/${site_name}/ecommerce/store`).reply(200, store_return)
    return await duda.ecomm.store.get({ site_name }).then(res => expect(res).to.eql(store_return))
  })

  it('can create a store', async () => {
    scope.post(`/api/sites/multiscreen/${site_name}/ecommerce/store`).reply(200, { site_name })
    return await duda.ecomm.store.create({ site_name }).then(res => expect(res).to.eql({ site_name }))
  })

  it('can update a store', async () => {
    scope.delete(`/api/sites/multiscreen/${site_name}/ecommerce/store`).reply(204)
    return await duda.ecomm.store.delete({ site_name })
  })
})