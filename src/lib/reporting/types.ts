export interface FormSubmission {
  form_title: string,
  message: any,
  date: string,
}

export type GetEmailSettingsResponse = void;
export type SubscribeCustomerResponse = void;
export type UnsubscribeCustomerResponse = void;
export type GetFormSubmissionsResponse = Array<FormSubmission>;
export type GetPublishedResponse = Array<string>;
export type GetUnpublishedResponse = Array<string>;

export interface GetPublishedPayload {
  last_days?: number,
  lastDays?: number,
}

export interface GetUnpublishedPayload {
  last_days?: number,
  lastDays?: number,
}

export type GetSitesCreatedResponse = Array<string>;

export interface GetSitesCreatedPayload {
  from?: string,
  to?: string,
}

export interface GetFormSubmissionsPayload {
  site_name: string,
  from?: string,
  to?: string,
}

export interface GetEmailSettingsPayload {
  account_name: string,
  site_name: string,
}

export interface SubscribeCustomerPayload {
  account_name: string,
  site_name: string,
  frequency: 'WEEKLY' | 'MONTHLY' | 'YEARLY',
}

export interface UnsubscribeCustomerPayload {
  account_name: string,
  site_name: string
}

type ActivityType =
  'site_created'
  | 'site_published'
  | 'site_backup_created'
  | 'page_created'
  | 'page_delete'
  | 'site_domain_changed'
  | 'site_unpublished'
  | 'site_restored'
  | 'site_reset'
  | 'site_transferred';

export interface GetActivityLogPayload {
  site_name: string,
  limit?: number,
  offset?: number,
  from?: string,
  to?: string,
  activities?: Array<ActivityType> | ActivityType
}

export interface ActivityLogEntry {
  date: string,
  activity: string,
  source: string,
  account_name: string,
}

export interface GetActivityLogResponse {
  site_name: string,
  results: Array<ActivityLogEntry>,
}

export interface GetAnalyticsHistoryPayload {
  site_name: string,
  from?: string,
  to?: string,
  result?: string,
  dimension?: 'system' | 'geo',
  date_granularity?: string,
  dateGranularity?: string,
}

export interface GetAnalyticsHistoryTraffic {
  UNIQUE_VISITORS: number,
  VISITS: number,
  PAGE_VIEWS: number,
}

export interface GetAnalyticsHistoryActivity {
  CLICK_TO_EMAILS: number,
  FORM_SUBMITS: number,
  CLICK_TO_MAPS: number,
  CLICK_TO_CALL: number,
}

export type GetAnalyticsHistoryResponse = GetAnalyticsHistoryTraffic | GetAnalyticsHistoryActivity;
