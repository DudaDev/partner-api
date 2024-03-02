interface PlanProfile {
  plan_features: Array<string>,
  plan_name: string,
  plan_subtitle: string
}

type PlanType = 'FREE' | 'TRIAL' | 'PAID';

interface AppPlans {
  is_hidden?: boolean,
  plan_grade: number,
  plan_profiles?: {
    [key: string]: PlanProfile
  },
  plan_type: PlanType,
  plan_uuid: string
}

interface AppScreenshot {
  alt_text?: string,
  image_url: string
}

interface AppProfile {
  app_logo: string,
  app_long_description?: string,
  app_name: string,
  app_screenshots?: Array<AppScreenshot>,
  app_short_description: string,
  privacy_note_page?: string,
  public_page?: string,
  terms_of_service_page?: string
}

type Events =
  'PUBLISH' |
  'UNPUBLISH' |
  'DOMAIN_UPDATED' |
  'CONTACT_FORM_SENT' |
  'CONTACT_FORM_SENT_V2' |
  'SITE_RESTORED' |
  'CONTENT_LIB_CHANGED' |
  'BRANDING_CHANGED' |
  'CONTENT_LIB_PUBLISHED' |
  'BLOG_POST_PUBLISH' |
  'PAGE_PUBLISHED' |
  'PRODUCT_CREATED' |
  'PRODUCT_UPDATED' |
  'PRODUCT_DELETED' |
  'CATEGORY_CREATED' |
  'CATEGORY_UPDATED' |
  'CATEGORY_DELETED' |
  'ECOMM_ORDER_CREATED' |
  'ECOMM_ORDER_UPDATED' |
  'ECOMM_REFUND_CREATED' |
  'CERTIFICATE_DELETED' |
  'CERTIFICATE_CREATED' |
  'NEW_CONVERSATION' |
  'NEW_COMMENT' |
  'CONVERSATION_UPDATED' |
  'COMMENT_EDITED' |
  'COMMENT_DELETED' |
  'MEMBER_CREATED' |
  'MEMBER_UPDATED' |
  'MEMBER_DELETED' |
  'ECOMM_PRODUCT_CREATED' |
  'ECOMM_PRODUCT_DELETED' |
  'ECOMM_PRODUCT_UPDATED';

interface Webhooks {
  endpoint: string,
  events?: Array<Events>
}

type WindowType = 'IFRAME' | 'NEW_TAB';

export interface Manifest {
  app_plans?: Array<AppPlans>,
  app_profile?: {
    [key: string]: AppProfile
  },
  base_sso_url?: string,
  categories?: Array<string>,
  default_plan_uuid?: string,
  installation_endpoint?: string,
  is_in_beta?: boolean,
  public_key?: string,
  required_fields?: Array<string>,
  scopes?: Array<string>,
  supported_locales?: Array<string>,
  uninstallation_endpoint?: string,
  updowngrade_installation_endpoint?: string,
  uuid?: string,
  visible_to_clients?: boolean,
  webhooks?: Webhooks,
  window_type?: WindowType,
  wl_app_profile?: {
    [key: string]: AppProfile
  }
}

export interface GetManifestPayload {
  app_uuid: string;
}

export interface UpdateManifestPayload extends Manifest {
  app_uuid: string
}
