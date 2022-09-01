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

type newPermission = 'REPUBLISH' & 'LIMITED_EDITING'

// export type Permissions = {
//   'REPUBLISH', 
// } | {
//   'LIMITED_EDITING'
// }

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

// function permissionsGrouper(permissionsArray: Array<Permissions>): Array<string> {
//   if (permissionsArray.includes('REPUBLISH') ||
//   permissionsArray.includes('DEV_MODE') ||
//   permissionsArray.includes('SEO') ||
//   permissionsArray.includes('BACKUPS') ||
//   permissionsArray.includes('RESET') ||
//   permissionsArray.includes('CONTENT_LIBRARY') ||
//   permissionsArray.includes('USE_APP') ||
//   permissionsArray.includes('CLIENT_MANAGE_FREE_APPS')){

//   }
//   else if (permissionsArray.includes('PUBLISH' ||
//   permissionsArray.includes('CUSTOM_DOMAIN'))){

//   }
//   else if (permissionsArray.includes('INSITE') ||
//   permissionsArray.includes('PUSH_NOTIFICATIONS') ||
//   permissionsArray.includes('ADD_FLEX')){

//   }
//   return []
// }

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
  permissions: Array<Permissions>;
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
