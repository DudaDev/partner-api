type Days = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

export interface Schema {
  type: string,
  custom_fields?: Array<{
    name: string,
    value: string,
  }>
}

export interface Phone {
  phoneNumber: string,
  label: string,
}

export interface Email {
  emailAddress: string,
  label: string,
}

export interface SocialAccounts {
  facebook?: string,
  twitter?: string,
  yelp?: string,
  foursquare?: string,
  instagram?: string,
  youtube?: string,
  linkedin?: string,
  pinterest?: string,
  vimeo?: string,
  rss?: string,
  reddit?: string,
  tripadvisor?: string,
  snapchat?: string,
}

export interface Address {
  streetAddress?: string,
  postalCode?: string,
  region?: string,
  city?: string,
  country?: string,
}

export interface Geo {
  longitude?: string | null,
  latitude?: string | null,
}

export interface BusinessHours {
  days: Days[],
  open: string,
  close: string,
}

export interface SiteTexts {
  overview: string,
  services: string,
  about_us: string,
  custom: Array<{
    label: string,
    text: string,
  }>,
}

export interface CreateLocationResponse {
  uuid: string,
  phones: Phone[] | null,
  emails: Email[] | null,
  social_accounts: {
    socialAccounts: SocialAccounts
  } | null,
  address: Address | null,
  geo: Geo | null
  label: string | null,
  logo_url: string | null,
  business_hours: BusinessHours[] | null,
}

export interface GetLocationResponse {
  uuid: string,
  phones: Phone[],
  emails: Email[],
  social_accounts: {
    socialAccounts: SocialAccounts
  }
  address_geolocation: string,
  geo: {
    longitude: string | null,
    latitude: string | null
  },
  logo_url: string | null,
  business_hours: BusinessHours[],
  label: string | null,
  address: Address
}

export interface MainLocationResponse extends GetLocationResponse {
  schema?: Schema,
}

export interface ContentLibraryResponse {
  location_data: MainLocationResponse,
  additional_locations?: GetLocationResponse[],
  site_texts: SiteTexts,
  business_data: {
    name: string | null,
    logo_url: string | null,
    data_controller: string | null,
  },
  site_images: Array<
    {
      label: string,
      url: string,
      alt: string,
    }
  >,
}

export type UpdateContentResponse = void;
export type PublishContentResponse = void;
export type UpdateLocationResponse = void;
export type DeleteLocationResponse = void;
export type InjectContentResponse = void;

export interface GetContentPayload {
  site_name: string,
}

export interface PublishContentPayload {
  site_name: string,
}

export interface LocationPayload {
  phones?: Array<{
    phoneNumber?: string,
    label?: string,
  }>,
  emails?: Array<{
    emailAddress?: string,
    label?: string
  }>,
  social_accounts?: SocialAccounts,
  address?: Address,
  geo?: {
    latitude?: string,
    longitude?: string
  },
  label?: string,
  logo_url?: string,
  business_hours?: BusinessHours[],
}

export interface UpdateContentPayload {
  site_name: string,
  location_data?: {
    phones?: Array<{
      phoneNumber?: string,
      label?: string,
    }>,
    emails?: Array<{
      emailAddress?: string,
      label?: string,
    }>,
    schema?: {
      type?: string,
      custom_fields?: Array<{
        name: string,
        value?: string,
      }>
    },
    label?: string,
    social_accounts?: SocialAccounts,
    address?: Address,
    geo?: {
      latitude?: string,
      longitude?: string
    },
    logo_url?: string,
    business_hours?: BusinessHours,
  },
  site_texts?: {
    overview?: string,
    about_us?: string,
    services?: string,
    custom?: Array<{
      label: string,
      text: string,
    }>,
  },
  business_data?: {
    name?: string,
    logo_url?: string,
  },
  site_images?: Array<{
    label: string,
    url?: string,
    alt?: string,
  }>,
}

export interface GetLocationPayload {
  site_name: string,
  location_id: string,
}

export interface CreateLocationPayload extends LocationPayload {
  site_name: string,
}

export interface UpdateLocationPayload extends LocationPayload {
  site_name: string,
  location_id: string,
}

export interface DeleteLocationPayload {
  site_name: string,
  location_id: string,
}

export interface ContentResource {
  src: string,
  resource_type: 'IMAGE',
}

export interface UploadResourcePayload {
  site_name: string,
  raw_body: Array<ContentResource>,
}

export interface UploadResourceResponse {
  n_failures: number,
  uploaded_resources: Array<{
    original_url: string,
    new_url: string,
    status: string,
  }>,
}

export interface InjectInnerHTML {
  key: string,
  value: string,
}

export interface InjectDomAttr {
  key: string,
  value: string,
  refs: Array<string>,
}

export interface InjectCSS {
  key: string,
  value: string,
  refs: Array<string>,
  important: boolean,
}

export type InjectContentTypes = InjectInnerHTML | InjectDomAttr | InjectCSS;

export interface InjectContentPayload {
  site_name: string,
  raw_body: Array<InjectContentTypes>,
}

export interface InjectContentSPAPayload {
  site_name: string,
  page_name: string,
  raw_body: Array<InjectContentTypes>,
}

export interface GetInjectedContentPayload {
  site_name: string,
  key?: string,
  ref?: string,
  type?: 'DOMATTR' | 'CSS' | 'INNTERHTML',
}

export type GetInjectedContentResponse = Array<InjectContentTypes>;
