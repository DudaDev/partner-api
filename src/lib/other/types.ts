export interface ListSiteBackupsPayload {
  site_name: string,
}

export interface Backup {
  date: string,
  name: string,
}

export type ListSiteBackupsResponse = Array<Backup>;

export interface CreateSiteBackupPayload {
  site_name: string,
  name?: string,
}

export interface CreateSiteBackupResponse {
  name: string,
}

export interface RestoreSiteBackupPayload {
  site_name: string,
  backup_name: string,
}

export type RestoreSiteBackupResponse = void;

export interface DeleteSiteBackupPayload {
  site_name: string,
  backup_name: string,
}

export type DeleteSiteBackupResponse = void;

export interface GenerateSSLPayload {
  site_name: string,
}

export type GenerateSSLResponse = void;

export interface RenewSSLPayload {
  site_name: string,
}

export type RenewSSLResponse = void;

export interface DeleteSSLPayload {
  site_name: string,
}

export type DeleteSSLResponse = void;
