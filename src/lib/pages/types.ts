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

export interface PageElement {
  type: 'SECTION',
  element_id: string,
  next_sibling_id: string,
  element_source_id: string
}

export interface ListPageElementPayload {
  site_name: string,
  page_uuid: string
}

export interface ListPageElementResponse {
  results: Array<PageElement>
}

export interface CreatePageElementPayload {
  site_name: string,
  page_uuid: string,
  element_source_id: string,
  type: 'SECTION' | string,
  next_sibling_id?: string,
  parent_element_id?: string
}

export interface CreatePageElementResponse extends PageElement {}

export interface UpdatePageElementPayload {
  site_name: string,
  page_uuid: string,
  element_id: string,
  type: 'SECTION' | string,
  next_sibling_id?: string,
  parent_element_id?: string
}

export interface UpdatePageElementResponse extends PageElement {}

export interface DeletePageElementPayload {
  site_name: string,
  page_uuid: string,
  element_id: string
}

export type DeletePageElementResponse = void;

export interface FooterPageElement {
  element_id: string,
  element_source_id: string,
  next_sibling_id: string
}

export interface ListFooterPageElementPayload {
  site_name: string
}

export interface ListFooterPageElementResponse {
  results: Array<FooterPageElement>
}

export interface CreateFooterPageElementPayload {
  site_name: string,
  element_source_id: string,
  next_sibling_id: string
}

export interface CreateFooterPageElementResponse extends FooterPageElement {}

export interface UpdateFooterPageElementPayload {
  site_name: string,
  element_id: string,
  next_sibling_id: string,
  parent_element_id: string
}

export interface UpdateFooterPageElementResponse extends FooterPageElement {}

export interface DeleteFooterPageElementPayload {
  site_name: string,
  element_id: string
}

export type DeleteFooterPageElementResponse = void;
