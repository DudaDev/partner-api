export interface SiteNamedOpts {
  site_name: string;
}

export interface GetSiteOpts extends SiteNamedOpts {
}

export interface GetSiteResponse {
  site_name: string;
}

export interface RepublishSiteOpts extends SiteNamedOpts {
}

export interface UpdateSiteOpts extends SiteNamedOpts {
  site_domain?: string,
  default_domain_prefix?: string,
  external_uid?: string,
  lang?: string,
  site_alternate_domains?: {
    domains?: string[],
    is_redirect?: boolean,
  },
  force_https?: string,
  site_seo?: {
    og_image?: string,
    title?: string,
    description?: string
  },
  schemas?: {
    local_business?: {
      enabled?: boolean,
    }
  },
  fav_icon?: string,
}

export type UpdateSiteResponse = Promise<null>;
