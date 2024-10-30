export type Languages =
  'en' |
  'es' |
  'ja' |
  'pt' |
  'fr' |
  'de' |
  'tr' |
  'en-gb' |
  'it' |
  'nl' |
  'ar' |
  'be' |
  'bg' |
  'bs-ba' |
  'ca' |
  'cs' |
  'da' |
  'el' |
  'en-au' |
  'en-ca' |
  'es-ar' |
  'es-cl' |
  'es-co' |
  'es-cr' |
  'es-mx' |
  'et' |
  'fa' |
  'fi' |
  'fr-ca' |
  'he' |
  'hi' |
  'lv' |
  'hu' |
  'hy' |
  'id' |
  'is' |
  'nb' |
  'ar' |
  'pa' |
  'pl' |
  'pt-br' |
  'ro' |
  'ru' |
  'sk' |
  'sl' |
  'sq' |
  'sv' |
  'sw' |
  'ta' |
  'th' |
  'uk' |
  'vi' |
  'zh' |
  'cy' |
  'tl' |
  'zh-tw' |
  'ka' |
  'mr' |
  'sr-rs' |
  'gl' |
  'eu' |
  'az' |
  'ps' |
  'mi' |
  'ko' |
  'mn';

export interface SiteLabel {
  name: string
}

export interface Opentable {
  restaurant_id?: string,
  country?: string,
  location?: string
}

export interface Agendize {
  company_id?: string,
  account_id?: string
}

export interface Site {
  external_uid?: string,
  piwik_id?: string,
  google_tracking_id?: string,
  googletagmanager_container_id?: Array<string>,
  site_domain?: string,
  site_business_info?: {
    business_name?: string,
    address?: {
      street?: string,
      city?: string,
      state?: string,
      country?: string,
      zip_code?: string
    },
    phone_number?: string,
    email?: string,
    opentable_info?: Array<Opentable>,
    agendize_info?: Array<Agendize>
  },
  site_alternate_domains?: {
    domains?: Array<string>,
    is_redirect?: boolean
  },
  site_seo?: {
    og_image?: string,
    title?: string,
    description?: string,
    no_index?: boolean
  },
  schemas?: {
    local_business?: {
      enabled?: boolean,
      status?: 'MISSING_REQUIRED_FIELDS' | 'MISSING_RECOMMENDED_FIELDS' | 'VALID',
      missing_required_fields?: Array<string>,
      missing_recommended_fields?: Array<string>
    }
  }
}

export type SiteThemeColor = {
  id: string,
  value: string,
  label: string,
}

export interface SiteNamedPayload {
  site_name: string;
}

export interface SiteNamedResponse {
  site_name: string;
}

export interface UpdateSiteThemePayload {
  site_name: string,
  colors: Array<SiteThemeColor>,
}

export interface GetSiteResponse extends Site {
  site_name: string,
  site_default_domain?: string,
  preview_site_url?: string,
  overview_site_url?: string,
  editor_site_url?: string,
  last_published_date?: string,
  first_published_date?: string,
  force_https?: boolean,
  additionalLanguages?: Array<Languages>,
  fav_icon?: string,
  last_reset_by?: string,
  certificate_status?: 'COMPLETE' | 'IN_PROGRESS' | 'FAILED',
  modification_date?: string,
  creation_date?: string,
  publish_status?: 'PUBLISHED' | 'UNPUBLISHED' | 'NOT_PUBLISHED_YET',
  thumbnail_url?: string,
  canonical_url?: string,
  store_status?: 'NONE' | 'ACTIVE' | 'SUSPENDED',
  store_type?: 'NATIVE' | 'THIRDPARTY',
  cookie_notification?: string,
  lang?: string,
  labels?: Array<SiteLabel>
}

export type CreateSiteResponse = SiteNamedResponse;
export type DuplicateSiteResponse = SiteNamedResponse;

export type UpdateSiteResponse = void;
export type DeleteSiteResponse = void;
export type PublishSiteResponse = void;
export type UnPublishSiteResponse = void;
export type ResetSiteResponse = void;
export type SwitchTemplateResponse = void;

export type SiteThemeResponse = {
  colors: Array<SiteThemeColor>,
}

export interface PublishSitePayload extends SiteNamedPayload {
}

export interface DeleteSitePayload extends SiteNamedPayload {
}

export interface UnPublishSitePayload extends SiteNamedPayload {
}

export interface GetSiteThemeResponse extends SiteThemeResponse {
}

export interface UpdateSiteThemeResponse extends SiteThemeResponse {
}

export interface DuplicateSitePayload extends SiteNamedPayload {
  new_default_domain_prefix: string,
  new_external_uid?: string
}

export interface ResetSitePayload extends SiteNamedPayload {
  template_id: string | number,
  site_data?: {
    removeBizInfos?: boolean,
  }
}

export interface SwitchTemplatePayload extends SiteNamedPayload {
  template_id: string | number,
}

type FirstPartialUpdateSitePayload = {
  site_name: string
}

interface SecondPartialUpdateSitePayload extends Site {
  fav_icon?: string,
  force_https?: boolean,
  cookie_notification?: string,
  default_domain_prefix?: string
}

type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type UpdateSitePayload = FirstPartialUpdateSitePayload
& AtLeastOne<SecondPartialUpdateSitePayload>

export type GetSiteByNamePayload = {
  site_name: string,
}

export type GetSiteByExtIDPayload = {
  external_uid: string,
}

export type GetSiteByExtIDResponse = Array<string>;

export interface CreateSitePayload extends Site {
  template_id: string | number,
  url?: string,
  default_domain_prefix?: string,
  labels?: Array<SiteLabel>,
  lang?: string,
  site_data?: Site
}

export type GetSiteThemePayload = {
  site_name: string
}
