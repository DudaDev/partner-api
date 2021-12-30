export * from '../../sites/types';

export interface GetBrandingPayload {
  site_name: string;
}

export interface GetBrandingResponse {
  logo: string;
  color: {
    links: string;
    button_background: string;
    button_text: string;
    text_on_light: string;
    text_on_dark: string;
    header_background: string;
    preview_background: string;
  },
  preview_background_image: string;
  dashboard_domain: string;
}

export interface UploadResourcesPayload {
  site_name: string;
  raw_body: Array<{
    resource_type: string;
    src: string;
  }>;
}

export interface UploadResourceResponse {
  n_failures: number;
  uploaded_resources: Array<{
    original_url: string;
    new_url: string;
    status: 'UPLOADED' | 'NOT_FOUND';
  }>;
}
