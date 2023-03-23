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
