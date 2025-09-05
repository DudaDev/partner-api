interface AdditionalAIContext {
    max_pages?: number
}

interface BusinessData {
    category: string,
    data_controller?: string,
    description: string,
    logo_url?: string,
    name: string,
    service_area?: string,
    tone_of_voice: string
}

interface Labels {
    name?: string
}

interface SiteAlternateDomains {
    domains?: Array<string>,
    is_redirect?: boolean
}

interface SiteBusinessInfoAddress {
    street?: string,
    state?: string,
    city?: string,
    country?: string,
    zip_code?: string
}

interface SiteBusinessInfo {
    business_name?: string,
    phone_number?: string,
    email?: string,
    address?: SiteBusinessInfoAddress
}

interface SiteSEO {
    title?: string,
    description?: string,
    og_image?: string,
    no_index?: boolean
}

interface SiteData {
    external_uid?: string,
    google_tracking_id?: string,
    googletagmanager_container_id?: Array<string>,
    site_alternate_domains?: SiteAlternateDomains,
    site_business_info?: SiteBusinessInfo,
    site_seo?: SiteSEO,
    site_domain?: string
}

interface SiteThemeColor  {
    id?: string,
    value?: string,
    label?: string,
}

interface BreakpointOverrides {
    font_size?: string
}

interface ThemeBreakpoints {
    mobile?: BreakpointOverrides,
    tablet?: BreakpointOverrides
}

interface ThemeTextStyle {
    breakpoints?: ThemeBreakpoints,
    font_family?: string,
    font_size?: string,
    font_weight?: string,
    color?: string,
    line_height?: string,
    letter_spacing?: string,
    text_decoration?: string,
    font_style?: string
}

interface ThemeTextStyles {
    default?: ThemeTextStyle,
    paragraph?: ThemeTextStyle,
    h1?: ThemeTextStyle,
    h2?: ThemeTextStyle,
    h3?: ThemeTextStyle,
    h4?: ThemeTextStyle,
    h5?: ThemeTextStyle,
    h6?: ThemeTextStyle
}

interface Theme {
    colors?: Array<SiteThemeColor>,
    text?: ThemeTextStyles
}

export interface GenerateAsyncPayload {
    additional_ai_context?: AdditionalAIContext,
    business_data?: BusinessData,
    default_domain_prefix?: string,
    do_not_gen_ssl?: boolean,
    labels?: Array<Labels>,
    lang?: string,
    site_data?: SiteData,
    theme?: Theme
}

export interface GenerateAsyncResponse {
    id: string,
    type: 'GENERATE_SITE_WITH_AI',
    status: 'STARTED',
    created_at: 'string'
}

export interface GetAsyncPayload {
    task_id: string
}

interface GetAsyncSiteResult {
    site_name: string
}

interface GetAsyncError {
    message: string
}

export interface GetAsyncResponse {
    id: string,
    type: 'GENERATE_SITE_WITH_AI',
    status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED',
    result?: GetAsyncSiteResult,
    error?: GetAsyncError,
    created_at: string,
    finished_at?: string
}