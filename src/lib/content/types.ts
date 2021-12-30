export interface Location {
  uuid?: string,
  phones?: Array<{
    phoneNumber?: string,
    label?: string,
  }>
  emails?: Array<{
    emailAddress?: string,
    label?: string,
  }>
  labels?: string,
  social_accounts?: {
    facebook?: string,
    twitter?: string,
    yelp?: string,
    foursquare?: string,
    google_plus?: string,
    instagram?: string,
    youtube?: string,
    linkedin?: string,
    pinterest?: string,
    vimeo?: string,
    rss?: string,
    reddit?: string,
    trip_advisor?: string,
    snapchat?: string,
  },
  address?: {
    street_address?: string,
    postal_code?: string,
    region?: string,
    city?: string,
  },
  geo?: {
    longitude?: string,
    latitude?: string
  },
  logo_url?: string,
  business_hours?: Array<{
    days?: Array<string>,
    open?: string,
    close?: string
  }>
}

export interface ContentLibrary {
  location_data?: {
    phones?: Array<{
      phoneNumber: string,
      label: string
    }>,
    emails?: Array<{
      emailAddress: string,
      label: string
    }>,
    label?: string,
    social_accounts?: {
      tripadvisor?: string,
      youtube?: string,
      facebook?: string,
      yelp?: string,
      pinterest?: string,
      google_plus?: string,
      linkedin?: string,
      instagram?: string,
      snapchat?: string,
      twitter?: string,
      rss?: string,
      vimeo?: string,
      reddit?: string
    },
    address?: {
      streetAddress?: string,
      postalCode?: string,
      region?: string,
      city?: string,
      country?: string,
    },
    address_geolocation?: string,
    geo?: {
      longitude?: string,
      latitude?: string
    },
    logo_url?: string,
    business_hours?: Array<{
      days?: Array<string>,
      open?: string,
      close?: string,
    }>
  },
  additional_locations?: Array<Location>,
  site_texts?: {
    overview?: string,
    services?: string,
    custom?: Array<{
      label?: string,
      text?: string,
    }>,
    about_us?: string
  },
  business_data?: {
    name?: string,
    logo_url?: string,
  },
  site_images?: [
    {
      label?: string,
      url?: string,
      alt?: string,
    },
    {
      label?: string,
      url?: string,
      alt?: string,
    }
  ]
}

export type UpdateContentResponse = void;
export type PublishContentResponse = void;
export type CreateLocationResponse = void;
export type UpdateLocationResponse = void;
export type DeleteLocationResponse = void;
export type InjectContentResponse = void;

export interface GetContentPayload {
  site_name: string,
}

export interface PublishContentPayload {
  site_name: string,
}

export interface UpdateContentPayload extends ContentLibrary {
  site_name: string,
}

export interface GetLocationPayload {
  site_name: string,
  location_id: string,
}

export interface CreateLocationPayload extends Location {
  site_name: string,
}

export interface UpdateLocationPayload extends Location {
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
