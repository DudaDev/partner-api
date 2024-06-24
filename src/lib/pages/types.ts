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

  export interface Page {
    title?: string,
    path?: string,
    seo?: Seo
    header_html?: string,
    draft_status?: 'STAGED_DRAFT' | 'DRAFT'
  }

  export interface ExistingPage extends Page {
    uuid?: string,
  }

  export type UpdatePageResponse = ExistingPage;
  export type CreatePageResponse = ExistingPage;
  export type DuplicatePageResponse = ExistingPage;
  export type DeletePageResponse = void;
  export type GetPageResponse = ExistingPage;
  export type ListPagesResponse = Array<ExistingPage>;

  export interface GetPagePayload {
    site_name: string,
    page_uuid: string,
  }

  export interface ListPagesPayload {
    site_name: string,
  }

  export interface UpdatePagePayload extends Page {
    site_name: string,
    page_uuid: string,
  }

  export interface CreatePagePayload {
    site_name: string,
    page: ExistingPage
  }

  export interface DuplicatePagePayload extends Page {
    site_name: string,
    page_uuid: string,
  }

  export interface DeletePagePayload {
    site_name: string,
    page_uuid: string,
  }
}
