export interface GetAccountOwnerPayload {
  site_name: string;
}

export interface GetAccountOwnerResponse {
  uuid: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
}
