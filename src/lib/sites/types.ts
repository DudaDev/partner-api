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
  account_name?: string,
  external_uid?: string,
  piwik_id?: string,
  google_tracking_id?: string,
  googletagmanager_container_id?: Array<string>,
  site_domain?: string,
  booking?: {
    is_available?: boolean,
    status?: 'ACTIVE' | 'SOFT_DELETED' | 'NOT_INSTALLED' | string
  }
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
  content_collection_form?: {
    url?: string,
    url_expiration_date?: string
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
      status?: 'MISSING_REQUIRED_FIELDS' | 'MISSING_RECOMMENDED_FIELDS' | 'VALID' | string,
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

export interface BreakpointOverrides {
  font_size?: string
}

export interface ThemeBreakpoints {
  mobile?: BreakpointOverrides,
  tablet?: BreakpointOverrides
}

export interface ThemeTextStyle {
  font_family?: string;
  font_size?: string;
  font_weight?: string;
  color?: string;
  line_height?: string;
  letter_spacing?: string;
  text_decoration?: string;
  font_style?: string;
  breakpoints?: ThemeBreakpoints;
}

export interface ThemeTextStyles {
  default?: ThemeTextStyle,
  paragraph?: ThemeTextStyle,
  h1?: ThemeTextStyle,
  h2?: ThemeTextStyle,
  h3?: ThemeTextStyle,
  h4?: ThemeTextStyle,
  h5?: ThemeTextStyle,
  h6?: ThemeTextStyle
}

export type ImageDisplayMode =
  'COVER' |
  'CONTAIN' |
  'TITLE' |
  'NO_REPEAT';

export type ImagePosition =
  'top left' |
  'top center' |
  'top right' |
  'center left' |
  'center center' |
  'center right' |
  'bottom left' |
  'bottom center' |
  'bottom right';

export interface ButtonBackgroundImageThemeStyles {
  display_mode?: ImageDisplayMode | string,
  position?: ImagePosition | string,
  url?: string
}

export interface ButtonBackgroundThemeStyles {
  color?: string,
  gradient?: string,
  image?: ButtonBackgroundImageThemeStyles
}

export interface ButtonBorderThemeStyles {
  color?: string,
  radius?: string,
  width?: string
}

export interface ButtonBreakpointsOverrideTextThemeStyles {
  font_size?: string
}

export interface ButtonBreakpointsOverrideThemeStyles {
  text?: ButtonBreakpointsOverrideTextThemeStyles
}

export interface ButtonBreakpointsThemeStyles {
  mobile?: ButtonBreakpointsOverrideThemeStyles,
  tablet?: ButtonBreakpointsOverrideThemeStyles
}

export interface ButtonBreakpointsHoverBackgroundThemeStyles {
  color?: string
}

export interface ButtonsBreakpointsHoverTextThemeStyles {
  color?: string,
  font_style?: string,
  font_weight?: string,
  text_decoration?: string
}

export interface ButtonBreakpointsHoverThemeStyles {
  background?: ButtonBreakpointsHoverBackgroundThemeStyles,
  border?: ButtonBreakpointsHoverBackgroundThemeStyles,
  text?: ButtonsBreakpointsHoverTextThemeStyles
}

export interface ButtonBreakpointsIconThemeStyles {
  color?: string
}

export interface ButtonBreakpointsTextThemeStyles{
  color?: string,
  direction?: 'ltr' | 'rtl' | string,
  font_family?: string,
  font_size?: string,
  font_style?: string,
  font_weight?: string,
  text_align?: 'left' | 'center' | 'right' | string,
  text_decoration?: string
}

export interface GlobalButtonThemeStyles {
  background?: ButtonBackgroundThemeStyles,
  border?: ButtonBorderThemeStyles,
  box_shadow?: string,
  breakpoints?: ButtonBreakpointsThemeStyles,
  hover?: ButtonBreakpointsHoverThemeStyles,
  icon?: ButtonBreakpointsIconThemeStyles,
  text?: ButtonBreakpointsTextThemeStyles
}

export interface ButtonThemeStyles {
  primary?: GlobalButtonThemeStyles,
  secondary?: GlobalButtonThemeStyles
}

export interface SpacingStyles {
 padding_bottom?: string,
 padding_left?: string,
 padding_right?: string,
 padding_top?: string 
}

export interface SectionThemeBreakpointStyles {
  spacing?: SpacingStyles
}

export interface SectionThemeOverrideBreakpointStyles {
  mobile?: SectionThemeBreakpointStyles,
  tablet?: SectionThemeBreakpointStyles
}

export interface SectionThemeContentWidthStyles {
  default_content_mode?: 'full_width' | 'constrained_width' | string,
  default_max_width_constraint?: string
}

export interface SectionThemeStyles {
  breakpoints?: SectionThemeOverrideBreakpointStyles,
  content_widht?: SectionThemeContentWidthStyles,
  spacings?: SpacingStyles
}

export interface ColumnThemeBreakpointStyles {
  spacing?: SpacingStyles
}

export interface ColumnThemeOverrideBreakpointStyles {
  mobile?: ColumnThemeBreakpointStyles,
  tablet?: ColumnThemeBreakpointStyles
}

export interface ColumnThemeStyles {
  breakpoints?: ColumnThemeOverrideBreakpointStyles,
  spacings?: SpacingStyles
}

export interface BackgroundThemeImageStyles {
  attachment?: 'fixed' | 'initial' | string,
  display_mode?: ImageDisplayMode | string,
  position?: ImagePosition | string,
  url?: string
}

export interface BackgroundThemeBreakpointStyles {
  color?: string,
  gradient?: string,
  image?: BackgroundThemeImageStyles
}

export interface BackgroundThemeOverrideBreakpointStyles {
  mobile?: BackgroundThemeBreakpointStyles,
  tablet?: BackgroundThemeBreakpointStyles
}

export interface BackgroundThemeStyles {
  breakpoints?: BackgroundThemeOverrideBreakpointStyles,
  color?: string,
  gradient?: string,
  image?: BackgroundThemeImageStyles
}

export interface SiteNamedPayload {
  site_name: string;
}

export interface SiteNamedResponse {
  site_name: string;
}

export interface UpdateSiteThemePayload {
  site_name: string,
  colors?: Array<SiteThemeColor>,
  text?: ThemeTextStyles,
  buttons?: ButtonThemeStyles,
  sections?: SectionThemeStyles,
  columns?: ColumnThemeStyles,
  inner_columns?: ColumnThemeStyles,
  background?: BackgroundThemeStyles
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
  certificate_status?: 'COMPLETE' | 'IN_PROGRESS' | 'FAILED' | string,
  modification_date?: string,
  creation_date?: string,
  publish_status?: 'PUBLISHED' | 'UNPUBLISHED' | 'NOT_PUBLISHED_YET' | string,
  thumbnail_url?: string,
  canonical_url?: string,
  store_status?: 'NONE' | 'ACTIVE' | 'SUSPENDED' | string,
  store_type?: 'NATIVE' | 'THIRDPARTY' | string,
  cookie_notification?: string,
  lang?: string,
  labels?: Array<SiteLabel>
}

export interface ListSiteResponse {
  offset: number,
  limit: number,
  total_responses: number,
  results: Array<GetSiteResponse>
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
  text: ThemeTextStyles,
  buttons: ButtonThemeStyles,
  sections: SectionThemeStyles,
  columns: ColumnThemeStyles,
  inner_columns: ColumnThemeStyles,
  background: BackgroundThemeStyles
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
  template_id?: string | number,
  template_alias: string,
  site_data?: {
    removeBizInfos?: boolean,
  }
}

export interface SwitchTemplatePayload extends SiteNamedPayload {
  template_id?: string | number,
  template_alias: string
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

export type PublishStatus =
  'NOT_PUBLISHED_YET' |
  'PUBLISHED' |
  'UNPUBLISHED';

export interface ListSitePayload {
  offset?: number,
  limit?: number,
  sort?: 'CREATION_DATE' | 'LAST_PUBLISHED_DATE' | string,
  direction?: 'asc' | 'desc' | string,
  label_names?: Array<string>,
  publish_status?: Array<PublishStatus>
}

export type GetSiteByNamePayload = {
  site_name: string,
}

export type GetSiteByExtIDPayload = {
  external_uid: string,
}

export type GetSiteByExtIDResponse = Array<string>;

export interface CreateSitePayload extends Site {
  template_id?: string | number,
  template_alias: string,
  url?: string,
  default_domain_prefix?: string,
  labels?: Array<SiteLabel>,
  lang?: string,
  site_data?: Site
}

export type GetSiteThemePayload = {
  site_name: string
}
