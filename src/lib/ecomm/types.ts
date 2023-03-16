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
  status?: "ACTIVE" | "HIDDEN", 
  images?: Array<Images>,
  prices?: Array<Prices>,
  seo?: {
    description?: string,
    product_url?: string,
    title?: string
  }
}

export interface CreateProductPayload extends Product {
  site_name: string
}

export interface CreateProductResponse extends Product {
  id: string
}
