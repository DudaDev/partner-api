export type CreateCollectionResponse = void;
export type UpdateCollectionResponse = void;
export type ClearCacheResponse = void;
export type ClearCacheByExtIdResponse = void;
export type DeleteCollectionResponse = void;
export type UpdateRowResponse = void;
export type DeleteRowResponse = void;
export type AddFieldResponse = void;
export type UpdateFieldResponse = void;
export type DeleteFieldResponse = void;

export interface Field {
  name: string,
  type: string,
}

export interface Collection {
  name?: string,
  fields: Array<Field>
  values: Array<{
    id?: string,
    data?: {
      date?: string,
      'entry-price'?: string,
      'event-image'?: string,
      location?: string,
    }
  }>
}

export interface CreateCollectionPayload {
  name: string,
  site_name: string,
  fields: Array<Field>,
  external_details?: {
    enabled?: boolean,
    external_id?: string,
    external_endpoint?: string,
    page_item_url_field?: string,
    collection_data_json_path?: string,
    authorization_header_value?: string,
  }
}

export interface GetCollectionPayload {
  site_name: string,
  collection_name: string,
}

export interface ListCollectionsPayload {
  site_name: string;
}

export type ListCollectionsResponse = Array<Collection>;

export type GetCollectionResponse = Collection | Array<Collection>;

export interface UpdateCollectionPayload {
  name: string,
  site_name: string,
  current_collection_name: string,
  external_details: {
    enabled?: boolean,
    external_id: string,
    external_endpoint: string,
    page_item_url_field?: string,
    collection_data_json_path?: string,
    authorization_header_value?: string,
  }
}

export interface ClearCachePayload {
  site_name: string,
  collection_name: string,
}

export interface ClearCacheByExtIdPayload {
  external_id: string;
}

export interface DeleteCollectionPayload {
  site_name: string,
  collection_name: string
}

export type AddRowResponse = Array<{
  id: string,
}>

export interface CollectionRow {
  data: any,
}

export interface AddRowPayload {
  site_name: string,
  collection_name: string,
  raw_body: Array<CollectionRow>,
}

export interface UpdateRowPayload {
  site_name: string,
  collection_name: string,
  raw_body: Array<{
    id: string,
    data: any,
  }>
}

export interface DeleteRowPayload {
  site_name: string,
  collection_name: string,
  raw_body: Array<{
    id: string,
  }>
}

export interface AddFieldPayload {
  site_name: string,
  collection_name: string,
  raw_body: Array<Field>
}

export interface UpdateFieldPayload {
  site_name: string,
  collection_name: string,
  field_name: string,
  name: string,
}

export interface DeleteFieldPayload {
  site_name: string,
  collection_name: string,
  field_name: string,
}
