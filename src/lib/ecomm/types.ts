interface Images {
  alt?: string,
  url?: string
}

interface Prices {
  compare_at_price?: string,
  currency: string,
  price: string
}

interface VariationProductOptions {
  choice_id: string,
  choice_value: string,
  option_id: string,
  option_name: string
}

interface Variations {
  external_id: string,
  id: string,
  images: Array<Images>,
  options: Array<VariationProductOptions>,
  price_difference: string,
  quantity: number,
  sku: string,
  status: 'HIDDEN' | 'ACTIVE'
}

interface ProductCustomFields {
  id: string,
  value: string
}

export interface Choices {
  id: string,
  value: string
}

export interface ProductOption {
  choices: Array<Choices>,
  id: string,
  name: string
}

export interface ProductSEO {
  description?: string,
  product_url?: string,
  title?: string
}

export interface Subcategory {
  id: string,
  title: string,
  order: number
}

export interface Product {
  custom_fields?: Array<ProductCustomFields>
  description?: string,
  external_id?: string,
  images?: Array<Images>,
  managed_inventory?: boolean,
  name: string,
  options?: Array<ProductOption>,
  prices?: Array<Prices>,
  quantity?: number,
  requires_shipping?: boolean,
  seo?: ProductSEO,
  sku?: string,
  status?: 'ACTIVE' | 'HIDDEN',
  stock_status?: 'IN_STOCK' | 'OUT_OF_STOCK',
}

export interface ProductResponse extends Product {
  categories: Array<Subcategory>,
  id: string,
  type?: 'PHSYICAL' | 'DIGITAL' | 'SERVICE' | 'DONATION',
  variations: Array<Variations>
}

export interface ListProductsPayload {
  site_name: string,
  offset?: number,
  limit?: number,
  sort?: string,
  direction?: 'asc' | 'desc'
}

export interface ListProductsResponse {
  limit: number,
  offset: number,
  results: Array<ProductResponse>,
  site_name: string,
  total_responses: number
}

export interface GetProductPayload {
  site_name: string,
  product_id: string
}

export interface GetProductResponse extends ProductResponse {}

export interface CreateProductPayload extends Product {
  site_name: string,
  type?: 'PHYSICAL' | 'DIGITAL' | 'SERVICE' | 'DONATION'
}

export interface CreateProductResponse extends ProductResponse {}

export interface UpdateProductPayload extends Product {
  site_name: string,
  product_id: string
}

export interface UpdateProductResponse extends ProductResponse {}

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

export interface UnitDimenions {
  height: number,
  width: number,
  length: number
}

export interface ShippingMethod {
  name: string,
  cost: number
}

export interface CartItem {
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
  unit_dimensions: UnitDimenions,
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
  items: Array<CartItem>,
  billing_address: Address,
  shipping_address: Address,
  shipping_method: ShippingMethod,
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

export interface OrderOptions {
  name: string,
  value: string
}

export interface Payment {
  transaction_id: string,
  status: 'PAID' | 'DEFERRED' | 'PAID_DEFERRED' | 'CHARGED_BACK' | 'REFUNDED' | 'PAIDOUT' | 'PENDING' | 'FAILED' | 'EXPIRED' | 'CANCELLED' | 'OPEN' | 'AUTHORIZED',
  currency: string,
  method: string,
  card_bramd: 'NULL' | 'VISA' | 'MASTERCARD' | 'AMEX' | 'DINERS_CLUB' | 'DISCOVER' | 'J_C_B' | 'CARD_BLEUE' | 'DANKORT' | 'CARTA_SI' | 'POSTEPAY' | 'MAESTRO' | 'LASER' | 'UNIOPAY' | 'OTHER',
  card_last_4: string
}

export interface OrderItem {
  id: string,
  product_id: string,
  variation_id: string,
  external_product_id: string,
  external_variation_id: string,
  name: string,
  image: string,
  sku: string,
  options: Array<OrderOptions>,
  quantity: number,
  shippable: boolean,
  unit_price: number,
  unit_weight: number,
  unit_dimensions: UnitDimenions,
  total: number,
  combined_weight: number,
  metadata: string
}

export interface RefundTaxes {
  id: string,
  name: string,
  rate: number,
  amount: number,
  provider: 'BUILT_IN' | 'AVALARA' | 'UNKNOWN'
}

export interface RefundOrderItem {
  id: string,
  quantity: number,
  amount: number,
  taxes: Array<RefundTaxes>
}

export interface RefundTaxProvider {
  provider: 'BUILT_IN' | 'AVALARA' | 'UNKNOWN',
  avalara_reference_id: string
}

export interface Refund {
  id: string,
  order_id: string,
  transcation_id: string,
  reason: string,
  items: Array<RefundOrderItem>,
  currency: string,
  tax_provider: RefundTaxProvider,
  subtotal: number,
  taxes: Array<RefundTaxes>,
  total: number,
  createD: string
}

export interface Order {
  source: 'CHECKOUT' | 'EXTERNAL' | 'SUBSCRIPTION_BILLING_ENGINE',
  mode: 'LIVE' | 'TEST',
  id: string,
  external_id: string,
  status: 'IN_PROGRESS' | 'PROCESSED' | 'DISPUTED' | 'SHIPPED' | 'DELIVERED' | 'PENDING' | 'CANCELLED' | 'DISPATCHED',
  email: string,
  invoice_number: string,
  items: Array<OrderItem>,
  billing_address: Address,
  shipping_address: Address,
  shipping_method: ShippingMethod,
  shipping_instructions: string,
  discounts: Array<Discount>,
  taxes: Array<Taxes>,
  subtotal: number,
  total: number,
  payment: Payment,
  refunds: Array<Refund>,
  tracking_url: string,
  tracking_number: string,
  created: string,
  user_agent: string,
  ip_address: string,
  metadata: string
}

export interface UpdateOrderItem {
  id: string,
  metadata: string
}

export interface ListOrdersPayload {
  site_name: string,
  offset?: number,
  limit?: number,
  sort?: string,
  direction?: string
}

export interface ListOrdersResponse {
  offset: number,
  limit: number,
  total_responses: number,
  results: Array<Order>
}

export interface GetOrderPayload {
  site_name: string,
  order_id: string
}

export type GetOrderResponse = Order;

export interface UpdateOrderPayload {
  site_name: string,
  order_id: string,
  status?: 'IN_PROGRESS' | 'PROCESSED' | 'DISPUTED' | 'SHIPPED' | 'DELIVERED' | 'PENDING' | 'CANCELLED' | 'DISPATCHED',
  email?: string,
  items?: Array<UpdateOrderItem>,
  billing_address?: Address,
  shipping_address?: Address,
  shipping_instructions?: string,
  metadata?: string
}

export interface UpdateOrderResponse extends Order {}

export interface ListRefundsPayload {
  site_name: string,
  order_id: string,
  offset?: number,
  limit?: number,
  sort?: string,
  direction?: string
}

export interface ListRefundsResponse {
  offset: number,
  limit: number,
  total_responses: number,
  results: Array<Refund>
}

export interface GetRefundPayload {
  site_name: string,
  order_id: string,
  refund_id: string
}

export type GetRefundResponse = Refund;

export type GetCartResponse = Cart;

interface BusinessAddress {
  address_1: string,
  address_2?: string,
  city: string,
  region?: string,
  country: string,
  postal_code?: string
}

interface CartSettings {
  split_name_field: boolean,
  split_address_1_field: boolean,
  display_instruction_field: boolean,
  display_phone_field: boolean
}

interface Ecomm {
  default_currency?: string,
  business_name?: string,
  business_address?: BusinessAddress,
  time_zone?: string,
  enabled_countries?: Array<string>,
  send_email_notifications?: boolean
}

export interface GetEcommPayload {
  site_name: string
}

export interface UpdateEcommPayload extends Ecomm {
  site_name: string
}

export interface GetEcommResponse extends Ecomm {
  cart_settings: CartSettings
}
export interface UpdateEcommResponse extends Ecomm {}

export interface PaymentItem {
  type: 'PHYSICAL' | 'DIGITAL' | 'TAX' | 'SHIPPING' | 'DISCOUNT',
  name: string,
  unit_price: number,
  quantity: number,
  discount_amount: number,
  total: number
}

export interface Invoice {
  purchase_id: string,
  purchase_type: string,
  email: string,
  language: string,
  currency: string,
  total: number,
  shipping_address: Address,
  billing_address: Address,
  items: Array<PaymentItem>
}

export interface PaymentLink {
  refunds?: string
}

export interface PaymentError {
  code: string,
  message: string
}

export interface GetPaymentsPayload {
  site_name: string,
  session_id: string
}

export interface GetPaymentsResponse {
  id: string,
  mode: 'LIVE' | 'TEST',
  cancel_url: string,
  invoice: Invoice,
  site_name: string,
  site_external_id: string
}

export interface ConfirmPaymentsPayload {
  site_name: string,
  session_id: string,
  state: 'PROCESSING' | 'PROCESSED' | 'INVALIDATED' | 'FAILED',
  transaction_id?: string,
  icon?: string,
  name?: string,
  instructions?: string,
  links?: PaymentLink,
  error?: PaymentError
}

export interface ConfirmPaymentsResponse {
  return_url: string
}

export interface Category {
  id: string,
  title: string,
  order: number,
  parent_id: string,
  products_count: number
}

export interface CategoryProductResponse {
  id: string,
  name: string,
  order: number
}

export interface CategoryProductPayload {
  id: string
}

export interface CategorySEO {
  url: string,
  title: string,
  description: string
}

export interface ListCategoriesPaylaod {
  site_name: string,
  limit?: number,
  offset?: number,
  sort?: 'title' | string,
  direction?: 'asc' | 'desc',
  search?: string,
  product_id?: string,
  parent_id?: string
}

export interface ListCategoriesResponse {
  offset: number,
  limit: number,
  total_responses: number,
  site_name: string,
  results: Array<Category>
}

export interface GetCategoryPayload {
  site_name: string,
  category_id: string
}

export interface GetCategoryResponse {
  id: string,
  title: string,
  description: string,
  parent_id: string,
  image: Images,
  seo: CategorySEO,
  subcategories: Array<Subcategory>,
  products: Array<CategoryProductResponse>
}

export interface CreateCategoryPayload {
  site_name: string,
  title?: string,
  description?: string,
  image?: Images,
  seo?: CategorySEO,
  parent_id?: string,
  products: Array<CategoryProductPayload>,
  subcategories?: Array<CategoryProductPayload>
}

export interface CreateCategoryResponse {
  id: string,
  title: string,
  description: string,
  parent_id: string,
  image: Images,
  seo: CategorySEO,
  subcategories: Array<CategorySEO>,
  products: Array<Subcategory>
}

export interface UpdateCategoryPayload {
  site_name: string,
  category_id: string,
  title?: string,
  description?: string,
  image?: Images,
  seo?: CategorySEO,
  parent_id?: string,
  products?: Array<CategoryProductPayload>,
  subcategories?: Array<CategoryProductPayload>
}

export interface UpdateCategoryResponse {
  id: string,
  title: string,
  description: string,
  parent_id: string,
  image: Images,
  seo: CategorySEO,
  subcategories: Array<Subcategory>,
  products: Array<CategoryProductResponse>
}

export interface DeleteCategoryPayload {
  site_name: string,
  category_id: string
}

export type DeleteCategoryResponse = null;

export interface ShippingProvider {
  id: string,
  live_shipping_rates_url: string,
  test_shipping_rates_url: string
}

export interface ListShippingProvidersPayload {
  site_name: string
}

export interface ListShippingProvidersResponse {
  offset: number,
  limit: number,
  total_responses: number,
  results: Array<ShippingProvider>
}

export interface GetShippingProviderPayload {
  site_name: string,
  id: string
}

export interface GetShippingProviderResponse extends ShippingProvider {}

export interface CreateShippingProviderPayload {
  site_name: string,
  live_shipping_rates_url: string,
  test_shipping_rates_url?: string
}

export interface CreateShippingProviderResponse extends ShippingProvider {}

export interface UpdateShippingProviderPayload {
  site_name: string,
  id: string,
  live_shipping_rates_url?: string,
  test_shipping_rates_url?: string
}

export interface UpdateShippingProviderResponse extends ShippingProvider {}

export interface DeleteShippingProviderPayload {
  site_name: string,
  id: string
}

export type DeleteShippingProviderResponse = null;

export interface ListOptionsPayload {
  site_name: string,
  offset?: number,
  limit?: number,
  sort?: string,
  direction?: 'asc' | 'desc'
}

export interface ListOptionsResponse {
  limit: number,
  offset: number,
  results: Array<ProductOption>,
  site_name: string,
  total_responses: number
}

export interface GetOptionPayload {
  site_name: string,
  option_id: string
}

export interface GetOptionResponse {
  choices: Array<Choices>,
  id: string,
  name: string
}

export interface CreateOptionPayload {
  site_name: string,
  choices: Array<string>,
  name: string
}

export interface CreateOptionResponse {
  choices: Array<Choices>,
  id: string,
  name: string
}

export interface UpdateOptionPayload {
  site_name: string,
  option_id: string,
  name: string
}

export interface UpdateOptionResponse {
  choices: Array<Choices>,
  id: string,
  name: string
}

export interface DeleteOptionPayload {
  site_name: string,
  option_id: string
}

export type DeleteOptionResponse = null;

export interface CreateOptionChoicePayload {
  site_name: string,
  option_id: string,
  value: string
}

export interface CreateOptionChoiceResponse {
  choices: Array<Choices>,
  id: string,
  name: string
}

export interface UpdateOptionChoicePayload {
  site_name: string,
  option_id: string,
  choice_id: string,
  value: string
}

export interface UpdateOptionChoiceResponse {
  choices: Array<Choices>,
  id: string,
  name: string
}

export interface DeleteOptionChoicePayload {
  site_name: string,
  option_id: string,
  choice_id: string
}

export type DeleteOptionChoiceResponse = null;

export interface VariationOptions {
  choice_id: string,
  choice_value: string,
  option_id: string,
  option_name: string
}

export interface GetVariationPayload {
  site_name: string,
  product_id: string,
  variation_id: string
}

export interface GetVariationResponse extends Variations {}

export interface UpdateVariationPayload {
  site_name: string,
  product_id: string,
  variation_id: string,
  external_id?: string,
  images?: Array<Images>,
  price_difference?: string,
  quantity?: number,
  sku?: string,
  status?: 'HIDDEN' | 'ACTIVE'
}

export interface UpdateVariationResponse extends Variations {}
