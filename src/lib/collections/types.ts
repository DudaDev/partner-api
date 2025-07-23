export type CreateCollectionResponse = void;
export type UpdateCollectionResponse = void;
export type ClearCacheResponse = void;
export type ClearCacheByExtIdResponse = void;
export type PublishCollecitonResponse = void;
export type DeleteCollectionResponse = void;
export type UpdateRowResponse = void;
export type DeleteSingleRowResponse = void;
export type DeleteRowResponse = void;
export type AddFieldResponse = void;
export type UpdateFieldResponse = void;
export type DeleteFieldResponse = void;

interface FieldIsMultiSelect {
  name: string,
  type: 'multi_select', 
  multi_select_options: Array<string>, // required when type === 'multi_select'
  inner_collection_fields?: Array<string>
}

interface FieldIsNotMultiSelect {
  name: string, 
  type: Exclude<string, 'multi_select'>,  // not 'multi_select'
  multi_select_options?: any,  // optional when type !== 'multi_select'
  inner_collection_fields?: Array<string>
}

export type Field = FieldIsMultiSelect | FieldIsNotMultiSelect;

export interface Collection {
  name?: string,
  item_count: number,
  fields: Array<Field>,
  values: Array<{
    id?: string,
    data?: {
      [key: string]: string | number; // additionalProp
    }
  }>
}

export interface CustomHeaders {
  name: string,
  values: Array<string>
}

export interface ExternalDetails {
  enabled?: boolean,
  external_id?: string,
  external_endpoint?: string,
  page_item_url_field?: string,
  collection_data_json_path?: string,
  authorization_header_value?: string,
  custom_headers?: Array<CustomHeaders>
}

export interface CreateCollectionPayload {
  name: string,
  site_name: string,
  customer_lock?: 'unlocked' | 'structure_locked' | 'locked',
  static_page_bindable?: boolean,
  fields: Array<Field>,
  external_details?: ExternalDetails
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
  name?: string,
  site_name: string,
  current_collection_name: string,
  customer_lock?: 'unlocked' | 'structure_locked' | 'locked',
  external_details?: ExternalDetails
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

export interface PublishCollectionPayload {
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

export interface DeleteSingleRowPayload {
  site_name: string,
  collection_name: string,
  row_id: string
}

export interface DeleteRowPayload {
  site_name: string,
  collection_name: string,
  raw_body: Array<string>
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
