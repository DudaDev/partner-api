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
  account_type?: 'CUSTOMER' | 'STAFF';
}

export interface UpdateAccountPayload {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
}

export interface DeleteAccountPayload {
  account_name: string;
}

export type CreateAccountResponse = void;
export type UpdateAccountResponse = void;
export type DeleteAccountResponse = void;

// Included Missing Permissions
// export type Permissions =
//   'STATS_TAB' |
//   'EDIT' |
//   'ADD_FLEX' |
//   'E_COMMERCE' |
//   'PUBLISH' |
//   'REPUBLISH' |
//   'DEV_MODE' |
//   'INSITE' |
//   'SEO' |
//   'BACKUPS' |
//   'CUSTOM_DOMAIN' |
//   'RESET' |
//   'BLOG' |
//   'PUSH_NOTIFICATIONS' |
//   'LIMITED_EDITING' |
//   'SITE_COMMENTS' |
//   'CONTENT_LIBRARY' |
//   'EDIT_CONNECTED_DATA' |
//   'MANAGE_CONNECTED_DATA' |
//   'USE_APP' |
//   'CLIENT_MANAGE_FREE_APPS';

// const republish: Permissions[] = ['REPUBLISH', 'LIMITED_EDITING'];
// const devMode: Permissions[] = ['DEV_MODE', 'LIMITED_EDITING'];
// const seo: Permissions[] = ['SEO', 'LIMITED_EDITING'];
// const backups: Permissions[] = ['BACKUPS', 'LIMITED_EDITING'];
// const reset: Permissions[] = ['RESET', 'LIMITED_EDITING'];
// const contentLibrary: Permissions[] = ['CONTENT_LIBRARY', 'LIMITED_EDITING'];
// const useApp: Permissions[] = ['USE_APP', 'LIMITED_EDITING'];
// const clientMangeFreeApps: Permissions[] = ['CLIENT_MANAGE_FREE_APPS', 'LIMITED_EDITING'];

// const publish: Permissions[] = ['PUBLISH', 'LIMITED_EDITING', 'REPUBLISH'];
// const customDomain: Permissions[] = ['CUSTOM_DOMAIN', 'LIMITED_EDITING', 'REPUBLISH'];

// const insite: Permissions[] = ['INSITE', 'EDIT'];
// const pushNotifications: Permissions[] = ['PUSH_NOTIFICATIONS', 'EDIT'];
// const addFlex: Permissions[] = ['ADD_FLEX', 'EDIT'];

// export type FullPermissions =
//   'STATS_TAB' |
//   'EDIT' |
//   typeof addFlex |
//   'E_COMMERCE' |
//   typeof publish |
//   typeof republish |
//   typeof devMode |
//   typeof insite |
//   typeof seo |
//   typeof backups |
//   typeof customDomain |
//   typeof reset |
//   'BLOG' |
//   typeof pushNotifications |
//   'LIMITED_EDITING' |
//   'SITE_COMMENTS' |
//   typeof contentLibrary |
//   'EDIT_CONNECTED_DATA' |
//   'MANAGE_CONNECTED_DATA' |
//   typeof useApp |
//   typeof clientMangeFreeApps

export type Permissions =
  'LIMITED_EDITING' |
  'REPUBLISH'

const republish = ['REPUBLISH'];
const limitedEditing = ['LIMITED_EDITING'];
const combo = [...limitedEditing, ...republish];

export type FullPermissions =
  ['LIMITED_EDITING'] |
  typeof combo;

export type GetPermissionsResponse = Array<Permissions>;

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
  // permissions: Array<Permissions>;
  permissions: Array<FullPermissions>;
}

export type SSOLinkTargets = 'STATS' | 'EDITOR' | 'RESET_SITE';

export type GrantSiteAccessResponse = void;
export type RemoveSiteAccessResponse = void;

export interface RemoveSiteAccessPayload {
  site_name: string;
  account_name: string;
}

export interface GetSSOLinkPayload {
  account_name: string;
  site_name?: string;
  target: SSOLinkTargets;
}

export interface GetSSOLinkResponse {
  url: string;
}

export interface GetResetPwdLinkPayload {
  account_name: string;
}

export interface GetResetPwdLinkResponse {
  reset_url: string;
}

export type ListCustomTeamGroupsPayload = null;

export interface ListCustomTeamGroupsResponse {
  group_name: string;
  color: string;
  title: string;
  permissions: string;
}

export type ListDudaTeamGroupsPayload = null;

export interface ListDudaTeamGroupsResponse {
  group_name: string;
  color: string;
  title: string;
  permissions: string;
}

export interface AssignTeamToGroupPayload {
  group_name: string;
  account_name: string;
}

export type AssignTeamToGroupResponse = null;
