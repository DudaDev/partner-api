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

  export type UpdatePageResponse = void;
  export type DuplicatePageResponse = void;
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
  export interface Page {
    title?: string,
    path?: string,
    seo?: {
      title?: string,
      description?: string,
      no_index?: boolean
    },
    header_html?: string,
  }

  export type UpdatePageResponse = void;
  export type DuplicatePageResponse = void;
  export type DeletePageResponse = void;
  export type GetPageResponse = Page;
  export type ListPagesResponse = Array<Page>;

  export interface GetPagePayload {
    site_name: string,
    page_uuid: string,
  }

  export interface ListPagesPayload {
    site_name: string,
  }

  export interface UpdatePagePayload {
    site_name: string,
    page_uuid: string,
    title?: string,
    path?: string,
    seo?: {
      title?: string,
      description?: string,
      no_index?: boolean,
    },
    header_html?: string,
  }

  export interface DuplicatePagePayload {
    site_name: string,
    page_uuid: string,
    title: string,
  }

  export interface DeletePagePayload {
    site_name: string,
    page_uuid: string,
  }
}
