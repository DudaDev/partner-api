// import * as pages from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Pages extends Resource {
  list = APIEndpoint<{
    site_name: string;
  }, {
    page_title: string;
    page_path: string;
    page_seo: {
      title: string;
      description: string;
      no_index: boolean;
    };
    page_name: string;
  }[]>({
    method: 'get',
    path: '/api/sites/multiscreen/site/{site_name}/pages',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<{
    site_name: string;
    page_name: string;
  }, {
    page_title: string;
    page_path: string;
    page_seo: {
      title: string;
      description: string;
      no_index: boolean;
    };
    page_name: string;
  }>({
    method: 'get',
    path: '/api/sites/multiscreen/site/{site_name}/pages/{page_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<{
    page_title: string;
    page_path: string;
    page_seo: {
      title: string;
      description: string;
      no_index: boolean;
    };
  }, null>({
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
}

export default Pages;
export { Pages };
