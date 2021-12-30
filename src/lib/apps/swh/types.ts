export interface SWH {
  location: 'BODY' | 'HEAD' | 'CONTENT_END';
  markup: string;
  uuid: string;
}

export interface ListSWHPayload {
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

export interface CreateSWHPayload extends SWH {
}

export interface CreateSWHResponse extends SWH {
}

export interface UpdateSWHPayload {
  markup: string;
}

export interface UpdateSWHResponse extends SWH {
}

export interface DeleteSWHPayload {
  markup: string;
}

export type DeleteSWHResponse = void;
