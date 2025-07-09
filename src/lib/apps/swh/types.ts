export interface SWH {
  location: 'BODY' | 'HEAD' | 'CONTENT_END' | 'BEFORE_SCRIPTS';
  markup: string;
  uuid: string;
}

export interface ListSWHPayload {
  site_name: string;
}

export interface ListSWHResponse {
  siteWides: Array<SWH>;
}

export interface GetSWHPayload {
  site_name: string;
  uuid: string;
}

export interface GetSWHResponse extends SWH {
}

export interface CreateSWHPayload {
  site_name: string;
  location?: 'BODY' | 'HEAD' | 'CONTENT_END' | 'BEFORE_SCRIPTS';
  markup?: string;
}

export interface CreateSWHResponse extends SWH {
}

export interface UpdateSWHPayload {
  site_name: string;
  uuid: string;
  location?: 'BODY' | 'HEAD' | 'CONTENT_END' | 'BEFORE_SCRIPTS';
  markup?: string;
}

export interface UpdateSWHResponse extends SWH {
}

export interface PublishSWHPayload {
  site_name: string;
  uuid: string;
}

export interface PublishSWHResponse extends SWH {
}

export interface DeleteSWHPayload {
  site_name: string;
  uuid: string;
}

export type DeleteSWHResponse = void;
