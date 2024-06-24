export namespace V1 {
  export interface Page {
    page_title?: string,
    page_path?: string,
    page_seo?: {
      title?: string,
      description?: string,
      no_index?: boolean
    }
  }

  export type UpdatePageResponse = Page;
  export type DuplicatePageResponse = Page;
  export type DeletePageResponse = void;
  export type GetPageResponse = Page;
  export type ListPagesResponse = Array<Page>;

  export interface GetPagePayload {
    site_name: string,
    page_name: string,
  }

  export interface ListPagesPayload {
    site_name: string,
  }

  export interface UpdatePagePayload {
    site_name: string,
    page_name: string,
    page_title?: string,
    page_path?: string,
    page_seo?: {
      title?: string,
      description?: string,
      no_index?: string,
    }
  }

  export interface DuplicatePagePayload {
    site_name: string,
    page_name: string,
    page_title: string,
  }

  export interface DeletePagePayload {
    site_name: string,
    page_name: string,
  }
}

export namespace V2 {
  export interface Seo {
    title?: string,
    description?: string,
    no_index?: boolean,
    og_image?: string
  }

  export interface Page_Payload_Object {
    title?: string,
    path?: string,
    seo?: Seo
    header_html?: string,
    draft_status?: 'STAGED_DRAFT' | 'DRAFT'
  }

  export interface Page_Response_Object {
    uuid?: string,
    title: string,
    path: string,
    seo?: Seo,
    header_html?: string,
    draft_status?: 'STAGED_DRAFT' | 'DRAFT'
  }

  export type UpdatePageResponse = Page_Response_Object;
  export type CreatePageResponse = Page_Response_Object;
  export type DuplicatePageResponse = Page_Response_Object;
  export type DeletePageResponse = void;
  export type GetPageResponse = Page_Response_Object;
  export type ListPagesResponse = Array<Page_Response_Object>;

  export interface GetPagePayload {
    site_name: string,
    page_uuid: string,
  }

  export interface ListPagesPayload {
    site_name: string,
  }

  export interface UpdatePagePayload extends Page_Payload_Object {
    site_name: string,
    page_uuid: string,
  }

  export interface CreatePagePayload {
    site_name: string,
    page: Page_Response_Object
  }

  export interface DuplicatePagePayload extends Page_Payload_Object {
    site_name: string,
    page_uuid: string,
  }

  export interface DeletePagePayload {
    site_name: string,
    page_uuid: string,
  }
}
