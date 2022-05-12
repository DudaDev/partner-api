export interface Site {
  account_name?: string,
  fav_icon?: string,
  external_uid?: string,
  site_domain?: string,
  lang?: string,
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
    opentable_info?: Array<any>
  },
  site_alternate_domains?: {
    domains?: Array<string>,
    is_redirect?: boolean
  },
  site_seo?: {
    og_image?: string,
    title?: string,
    description?: string
  },
  schemas?: {
    local_business?: {
      enabled?: boolean,
      status?: 'MISSING_REQUIRED_FIELDS' | 'MISSING_RECOMMENDED_FIELDS' | 'VALID',
      missing_required_fields?: Array<string>,
      missing_recommended_fields?: Array<string>
    }
  },
  site_name?: string,
  template_id?: number,
  site_default_domain?: string,
  preview_site_url?: string,
  last_published_date?: string,
  first_published_date?: string,
  last_reset_by?: string,
  certificate_status?: 'COMPLETE' | 'IN_PROGRESS' | 'FAILED',
  modification_date?: string,
  creation_date?: string,
  publish_status?: 'PUBLISHED' | 'UNPUBLISHED' | 'NOT_PUBLISHED_YET',
  thumbnail_url?: string,
  store_status?: 'NONE' | 'ACTIVE' | 'SUSPENDED'
}

export interface SiteNamedPayload {
  site_name: string;
}

export interface SiteNamedResponse {
  site_name: string;
}

export type GetSiteResponse = Site;
export type CreateSiteResponse = SiteNamedResponse;
export type DuplicateSiteResponse = SiteNamedResponse;

export type UpdateSiteResponse = void;
export type DeleteSiteResponse = void;
export type PublishSiteResponse = void;
export type UnPublishSiteResponse = void;
export type ResetSiteResponse = void;
export type SwitchTemplateResponse = void;

export interface PublishSitePayload extends SiteNamedPayload {
}

export interface DeleteSitePayload extends SiteNamedPayload {
}

export interface UnPublishSitePayload extends SiteNamedPayload {
}

export interface DuplicateSitePayload extends SiteNamedPayload {
  new_default_domain_prefix: string;
}

export interface ResetSitePayload extends SiteNamedPayload {
  template_id?: string | number,
  site_data?: {
    remove_biz_infos?: boolean,
  }
}

export interface SwitchTemplatePayload extends SiteNamedPayload {
  template_id: string | number,
}

export interface UpdateSitePayload {
  site_name: string,
  site_domain?: string,
  default_domain_prefix?: string,
  external_uid?: string,
  lang?: string,
  site_alternate_domains?: {
    domains?: Array<string>,
    is_redirect?: boolean
  },
  force_https?: boolean,
  site_seo?: {
    og_image?: string,
    title?: string,
    description?: string
  },
  schemas?: {
    local_business?: {
      enabled?: boolean
    }
  },
  fav_icon?: string,
}

export type GetSiteByNamePayload = {
  site_name: string,
}

export type GetSiteByExtIDPayload = {
  external_uid: string,
}

export interface CreateSitePayload {
  template_id: number,
  fav_icon?: string,
  default_domain_prefix?: string,
  lang?: string,
  site_data?: {
    external_uid?: string,
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
      opentable_info?: Array<any>
    },
    site_alternate_domains?: {
      domains?: Array<string>,
      is_redirect?: boolean
    },
    site_seo?: {
      og_image?: string,
      title?: string,
      description?: string
    },
    schemas?: {
      local_business?: {
        enabled?: boolean,
        status?: 'MISSING_REQUIRED_FIELDS' | 'MISSING_RECOMMENDED_FIELDS' | 'VALID',
        missing_required_fields?: Array<string>,
        missing_recommended_fields?: Array<string>
      }
    },
  }
}
