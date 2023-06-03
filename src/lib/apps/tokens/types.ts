export interface RefreshTokenPayload {
  refresh_token: string;
  app_uuid: string;
}

export interface RefreshTokenResponse {
  authorization_code: string;
  expiration_date: number;
  refresh_token: string;
  type: string;
}
