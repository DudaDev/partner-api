import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Pages extends Resource {
  list = APIEndpoint<Types.V2.ListPagesPayload, Types.V2.ListPagesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/pages',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.V2.GetPagePayload, Types.V2.GetPageResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/pages/{page_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.V2.UpdatePagePayload, Types.V2.UpdatePageResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/pages/{page_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      uuid: {
        type: 'string',
        required: false,
      },
      title: {
        type: 'string',
        required: false,
      },
      path: {
        type: 'string',
        required: false,
      },
      seo: {
        type: 'object',
        required: false,
      },
      header_html: {
        type: 'string',
        required: false,
      },
    },
  });

  create = APIEndpoint<Types.V2.CreatePagePayload, Types.V2.CreatePageResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/pages',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      page: {
        type: 'object',
        required: true,
      },
    },
  });

  duplicate = APIEndpoint<Types.V2.DuplicatePagePayload, Types.V2.DuplicatePageResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/pages/{page_uuid}/duplicate',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      uuid: {
        type: 'string',
        required: false,
      },
      title: {
        type: 'string',
        required: false,
      },
      path: {
        type: 'string',
        required: false,
      },
      seo: {
        type: 'object',
        required: false,
      },
      header_html: {
        type: 'string',
        required: false,
      },
    },
  });

  delete = APIEndpoint<Types.V2.DeletePagePayload, Types.V2.DeletePageResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/pages/{page_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Pages;
export { Pages };
