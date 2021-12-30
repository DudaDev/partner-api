import * as Types from './types';
import Resource from '../base';
import { APIEndpoint } from '../APIEndpoint';

class Templates extends Resource {
  list = APIEndpoint<Types.ListTemplatesPayload, Types.ListTemplatesResponse>({
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

  get = APIEndpoint<Types.GetTemplatePayload, Types.GetTemplateResponse>({
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

  delete = APIEndpoint<Types.DeleteTemplatePayload, Types.DeleteTemplateResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/templates/{template_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateTemplatePayload, Types.UpdateTemplateResponse>({
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

  createFromSite = APIEndpoint<Types.CreateFromSitePayload, Types.CreateFromResponse>({
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

  createFromTemplate = APIEndpoint<Types.CreateFromTemplatePayload, Types.CreateFromResponse>({
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
