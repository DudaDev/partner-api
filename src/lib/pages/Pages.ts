import * as Types from './types';
import Resource from '../base';
import PagesV2 from './v2';

import { APIEndpoint } from '../APIEndpoint';

class Pages extends Resource {
  v2 = new PagesV2(this.config);

  list = APIEndpoint<Types.V1.ListPagesPayload, Types.V1.ListPagesResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/site/{site_name}/pages',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.V1.GetPagePayload, Types.V1.GetPageResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/site/{site_name}/pages/{page_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.V1.UpdatePagePayload, Types.V1.UpdatePageResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/site/{site_name}/pages/{page_name}/update',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      page_title: {
        type: 'string',
        required: false,
      },
      page_path: {
        type: 'string',
        required: false,
      },
      page_seo: {
        type: 'object',
        required: false,
      },
    },
  });

  duplicate = APIEndpoint<Types.V1.DuplicatePagePayload, Types.V1.DuplicatePageResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/site/{site_name}/pages/{page_name}/duplicate',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      page_title: {
        type: 'string',
        required: true,
        properKey: 'pageTitle',
      },
    },
  });

  delete = APIEndpoint<Types.V1.DeletePagePayload, Types.V1.DeletePageResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/site/{site_name}/pages/{page_name}/delete',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Pages;
export { Pages };
