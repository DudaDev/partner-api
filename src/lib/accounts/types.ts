export interface Account {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
  account_type?: string;
}

export interface GetAccountPayload {
  account_name: string;
}

export interface GetAccountResponse {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
  accountData?: {
    company_name?: string;
  };
  account_type?: 'CUSTOMER' | 'STAFF';
}

export interface CreateAccountPayload {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
  company_name?: string;
  account_type?: 'CUSTOMER' | 'STAFF';
}

export interface UpdateAccountPayload {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
  company_name?: string;
}

export interface DeleteAccountPayload {
  account_name: string;
}

export type CreateAccountResponse = void;
export type UpdateAccountResponse = void;
export type DeleteAccountResponse = void;

export type ClientPermissions =
  'STATS_TAB' |
  'EDIT' |
  'ADD_FLEX' |
  'E_COMMERCE' |
  'PUBLISH' |
  'REPUBLISH' |
  'DEV_MODE' |
  'INSITE' |
  'SEO' |
  'BACKUPS' |
  'CUSTOM_DOMAIN' |
  'RESET' |
  'BLOG' |
  'PUSH_NOTIFICATIONS' |
  'LIMITED_EDITING' |
  'SITE_COMMENTS' |
  'CONTENT_LIBRARY' |
  'EDIT_CONNECTED_DATA' |
  'MANAGE_CONNECTED_DATA' |
  'USE_APP' |
  'CLIENT_MANAGE_FREE_APPS' |
  'AI_ASSISTANT' |
  'MANAGE_DOMAIN' |
  'CONTENT_LIBRARY_EXTERNAL_DATA_SYNC' |
  'SEO_OVERVIEW' |
  'BOOKING_ADMIN' |
  'BOOKING_USER' |
  string;

export interface GetPermissionsResponse {
  permissions: Array<ClientPermissions>;
}

export type ListAccessibleSitesResponse = Array<{
  site_name: string;
}>

export interface ListAccessibleSitesPayload {
  account_name: string;
}

export interface GetPermissionsPayload {
  site_name?: string;
  account_name?: string;
}

export interface GrantSiteAccessPayload {
  site_name: string;
  account_name: string;
  permissions: Array<ClientPermissions>;
}

export type SSOLinkTargets =
  'STATS' |
  'EDITOR' |
  'RESET_SITE' |
  'SWITCH_TEMPLATE' |
  'SWITCH_TEMPLATE_WITH_AI' |
  'RESET_BASIC' |
  'STORE_MANAGEMENT' |
  'SITE_OVERVIEW' |
  'SITE_SEO_OVERVIEW';

export type GrantSiteAccessResponse = void;
export type RemoveSiteAccessResponse = void;

export interface RemoveSiteAccessPayload {
  site_name: string;
  account_name: string;
}

export interface GetSSOLinkPayload {
  account_name: string;
  site_name?: string;
  target?: SSOLinkTargets;
}

export interface GetSSOLinkResponse {
  url: string;
}

export interface GetPwdLinkPayload {
  account_name: string;
}

export interface GetPwdLinkResponse {
  reset_url: string;
}

type TeamPermissions =
  'ANNOTATIONS' |
  'MANAGE_CATEGORY' |
  'CREATE_SITES' |
  'DELETE_SITES' |
  'EDIT_SITES' |
  'WIDGETS_BUILDER' |
  'MANAGE_DOMAIN' |
  'MANAGE_STAFF' |
  'STATS' |
  'CONTENT_LIBRARY_EXTERNAL_DATA_SYNC' |
  'REPUBLISH' |
  'LIMIT_EDITING' |
  'CONTENT_LIBRARY' |
  'E_COMMERCE' |
	'CO_PILOT' |
  'ACTIVITY_LOG' |
  'INSTALL_APP' |
  'PRO_SETTINGS' |
  'VIEW_APP' |
  'DEV_MODE' |
  'MARKETING' |
  'AI_ASSISTANT' |
  'API' |
  'MANAGE_CUSTOMERS' |
  'PUBLISH' |
  'CUSTOM_DOMAIN' |
  'BLOG' |
  string;

export interface TeamGroups {
  group_name?: string,
  color?: string,
  title: string,
  permissions?: TeamPermissions
}

export type ListCustomTeamGroupsPayload = null;

export type ListCustomTeamGroupsResponse = Array<TeamGroups>

export type ListDudaTeamGroupsPayload = null;

export type ListDudaTeamGroupsResponse = Array<TeamGroups>

export interface AssignTeamToGroupPayload {
  group_name: string;
  account_name: string;
}

export type AssignTeamToGroupResponse = null;
