export type UpdateTemplateResponse = void;
export type DeleteTemplateResponse = void;

export interface Template {
  template_name?: string,
  preview_url?: string,
  thumbnail_url?: string,
  desktop_thumbnail_url?: string,
  tablet_thumbnail_url?: string,
  mobile_thumbnail_url?: string,
  template_id?: number,
  template_properties?: {
    can_build_from_url?: boolean,
    has_store?: boolean,
    store_type?: 'NATIVE' | 'THIRDPARTY',
    has_blog?: boolean,
    page_count?: number
    type?: 'DUDA' | 'CUSTOM'
  }
}

export type ListTemplatesResponse = Array<Template>;
export type GetTemplateResponse = Template;

export type ListTemplatesPayload = {
  lang?: string,
  has_store?: string,
  has_blog?: string,
  store_type?: 'NATIVE' | 'THIRDPARTY',
  editor?: 'ADVANCED' | 'ADVANCED-2.0',
  type?: 'DUDA' | 'CUSTOM',
  page_count?: number,
  "page_count.gte"?: number,
  "page_count.lte"?: number,
  "name.contains"?: string,
  sort?: string,
  direction?: 'asc' | 'desc',
  categories?: string
}

export interface CreateFromResponse {
  template_name: string,
  preview_url: string,
  thumbnail_url: string,
  template_id: number,
  template_properties: {
    can_build_from_url: boolean
  }
}

export interface DeleteTemplatePayload {
  template_id: string,
}

export interface CreateFromSitePayload {
  site_name: string,
  new_template_name: string,
}

export interface CreateFromTemplatePayload {
  template_id: string,
  new_template_name: string,
}

export interface UpdateTemplatePayload {
  template_id: string,
  new_name: string,
}

export interface GetTemplatePayload {
  template_id?: string,
}
