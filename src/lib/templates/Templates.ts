// import * as Template from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Templates extends Resource {
  list = APIEndpoint<{
    lang?: string
  }, any>({
    method: 'get',
    path: '/api/sites/multiscreen/templates',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      lang: {
        type: 'string',
        required: false,
      },
    },
  });

  get = APIEndpoint<{
    template_id: string;
    lang?: string;
  }, any>({
    method: 'get',
    path: '/api/sites/multiscreen/templates/{template_id}',
    defaults: {
      host: 'api.duda.co',
    },
    queryParams: {
      lang: {
        type: 'string',
        required: false,
      },
    },
  });

  delete = APIEndpoint<{
    template_id: string;
    lang?: string;
  }, any>({
    method: 'delete',
    path: '/api/sites/multiscreen/templates/{template_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<{
    template_id: string;
    new_name: string;
  }, any>({
    method: 'post',
    path: '/api/sites/multiscreen/templates/{template_id}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      new_name: {
        type: 'string',
        required: false,
      },
    },
  });

  createFromSite = APIEndpoint<{
    site_name: string;
    new_template_name: string;
  }, any>({
    method: 'post',
    path: '/api/sites/multiscreen/templates/fromsite',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      site_name: {
        type: 'string',
        required: true,
      },
      new_template_name: {
        type: 'string',
        required: false,
      },
    },
  });

  createFromTemplate = APIEndpoint<{
    template_id: string;
    new_template_name: string;
  }, any>({
    method: 'post',
    path: '/api/sites/multiscreen/templates/fromtemplate',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      template_id: {
        type: 'string',
        required: true,
      },
      new_template_name: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default Templates;
export { Templates };
