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
