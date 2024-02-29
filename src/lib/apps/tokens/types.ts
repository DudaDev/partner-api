export interface RefreshTokenPayload {
  app_uuid: string,
  refresh_token: string
}

export interface RefreshTokenResponse {
  authorization_code: string;
  expiration_date: number;
  refresh_token: string;
  type: string;
}
