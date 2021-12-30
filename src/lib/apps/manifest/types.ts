export interface ManifestProfile {
  app_name: string;
  app_logo: string;
  app_short_description: string;
  app_long_description: string;
  public_page: string;
  terms_of_service_page: string;
  privacy_note_page: string;
  app_screenshots: Array<{
    image: string;
    alt: string;
  }>;
}

export interface Manifest {
  uuid: string,

  webhooks: {
    endpoint: string;
    events: Array<'DOMAIN_UPDATED' | 'UNPUBLISH' | 'PUBLISH'>;
  };

  scopes:
    'GET_CONTENT_LIBRARY' |
    'UPDATE_PAGES' |
    'GET_WEBSITE' |
    'UPDATE_INJECT_CONTENT' |
    'UNPUBLISH_SITE' |
    'GET_INJECT_CONTENT' |
    'GET_ACCOUNT_DETAILS' |
    'MANAGE_BACKUPS' |
    'UPDATE_WEBSITE' |
    'GET_PAGES' |
    'SITE_WIDE_HTML' |
    'GET_COLLECTION' |
    'GET_BACKUP' |
    'REPORTING' |
    'UPDATE_SSL' |
    'UPDATE_COLLECTIONS' |
    'UPDATE_CONTENT_LIBRARY' |
    'PUBLISH_SITE';

  public_key: string;
  installation_endpoint: string;
  uninstallation_endpoint: string;
  updowngrade_installation_endpoint: string;
  base_sso_url: string;
  supported_locales: Array<string>;

  app_profile: {
    [key: string]: ManifestProfile
  },

  wl_app_profile: {
    [key: string]: ManifestProfile
  },

  app_plans: Array<{
    plan_uuid: string;
    plan_type: 'FREE' | 'PAID' | 'TRIAL';
    is_hidden: boolean;
    plan_grade: number;
    plan_profiles: Array<any>;
  }>,
  visible_to_clients: boolean;
  default_plan_uuid: string;
  window_type: 'IFRAME' | 'NEW_TAB';
  required_fields: Array<'EMAIL' | 'LOCATION'>;
  is_in_beta: boolean;
}

export interface GetManifestPayload {
  app_uuid: string;
}
