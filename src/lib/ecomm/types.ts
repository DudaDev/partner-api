interface Images {
  alt?: string,
  url?: string
}

interface Prices {
  compare_at_price?: string,
  currency: string,
  price: string
}

export interface Product {
  description?: string,
  name: string,
  sku?: string,
  status?: 'ACTIVE' | 'HIDDEN',
  images?: Array<Images>,
  prices?: Array<Prices>,
  seo?: {
    description?: string,
    product_url?: string,
    title?: string
  }
}

export interface ListProductsPayload {
  site_name: string,
  offset?: number,
  limit?: number,
  sort?: Array<string>
}

export interface ListProductsResponse {
  limit: string,
  offset: string,
  results: Array<Product>,
  site_name: string,
  total_responses: number
}

export interface GetProductPayload {
  site_name: string,
  product_id: string
}

export interface GetProductResponse extends Product {
  id: string
}

export interface CreateProductPayload extends Product {
  site_name: string
}

export interface CreateProductResponse extends Product {
  id: string
}

export interface UpdateProductPayload extends Product {
  site_name: string,
  product_id: string
}

export interface UpdateProductResponse extends Product {
  id: string
}

export interface DeleteProductPayload {
  site_name: string,
  product_id: string
}

export type DeleteProductResponse = void;

export interface Gateway {
  live_payment_methods_url: string,
  test_payment_methods_url?: string
}

export interface CreateGatewayPayload extends Gateway {
  site_name: string
}

export interface GatewayResponse extends Gateway {
  id: string
}

export interface ListGatewaysPayload {
  site_name: string
}

export interface ListGatewaysResponse {
  offset: number,
  limit: number,
  total_responses: number,
  results: Array<GatewayResponse>
}

export interface GetGatewayPayload {
  site_name: string,
  gateway_id: string
}

export interface UpdateGatewayPayload {
  site_name: string,
  gateway_id: string,
  live_payment_methods_url: string,
  test_payment_methods_url?: string
}

export interface DeleteGatewayPayload {
  site_name: string,
  gateway_id: string
}

export interface Discount {
  id: string,
  name: string,
  savings: number,
  type: 'RATE' | 'AMOUNT'
}

export interface Taxes {
  name: string,
  rate: number,
  amount: number
}

export interface Item {
  type: 'PHYSICAL_PRODUCT' | 'MEMBERSHIP' | 'SHIPPING' | 'DIGITAL_PRODUCT',
  id: string,
  added: string,
  product_id: string,
  variation_id: string,
  external_product_id: string,
  external_variation_id: string,
  name: string,
  image: string,
  options: {
    name: string,
    value: string
  },
  quantity: number,
  shippable: boolean,
  plan: {
    frequency: 'WEEKLY' | 'MONTHLY' | 'YEARLY',
    id: string,
    name: string,
    price: {
      minor_unit_value: number,
      value: number,
      currency: {
        value: string
      }
    },
    type: 'FREE' | 'PAID'
  },
  unit_price: number,
  unit_weight: number,
  unit_dimensions: {
    height: number,
    width: number,
    length: number
  },
  discounts: Discount
  tax_code: string,
  taxes: Taxes
  total: number,
  combined_weight: number,
  metadata: string
}

export interface Address {
  first_name: string,
  last_name: string,
  full_name: string,
  address_1: string,
  address_2: string,
  street_number: string,
  street_name: string,
  city: string,
  sub_locality: string,
  region: string,
  country: string,
  postal_code: string,
  phone: string
}

export interface Cart {
  id: string,
  mode: 'LIVE' | 'TEST',
  status: 'IN_PROGRESS' | 'ABANDONED',
  language: string,
  email: string,
  currency: string,
  items: Array<Item>,
  billing_address: Address,
  shipping_address: Address,
  shipping_method: {
    name: string,
    cost: number
  },
  shipping_instructions: string,
  discounts: Discount,
  tax_provider: 'BUILT_IN' | 'AVALARA' | 'UNKNOWN',
  taxes: Taxes,
  subtotal: number,
  total: number,
  created: string,
  updated: string,
  user_agent: string,
  ip_address: string,
  metadata: string
}

export interface ListCartsPayload {
  site_name: string,
  status?: 'IN_PROGRESS' | 'ABANDONED',
  mode?: 'LIVE' | 'TEST',
  email?: string,
  cursor?: string,
  limit?: number
}

export interface ListCartsResponse {
  cursor: string,
  has_more_results: boolean,
  results: Array<Cart>
}

export interface GetCartPayload {
  site_name: string,
  cart_id: string
}

export type GetCartResponse = Cart;

interface BusinessAddress {
  address_1: string,
  address_2?: string,
  city: string,
  region?: string,
  country: string,
  postal_code?: string
}

interface Ecomm {
  default_currency?: string,
  business_name?: string,
  business_address?: BusinessAddress,
  time_zone?: string,
  enabled_countries?: Array<string>,
  send_email_notifications?: boolean
}

export interface UpdateEcommPayload extends Ecomm {
  site_name: string
}

export interface UpdateEcommResponse extends Ecomm {}
