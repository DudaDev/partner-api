import * as Site from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Sites extends Resource {
  get = APIEndpoint<Site.GetSiteOpts, Site.GetSiteResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  publish = APIEndpoint<{ site_name: string }, null>({
    method: 'post',
    path: '/api/sites/multiscreen/publish/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<{ site_name: string }, null>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  unpublish = APIEndpoint<{ site_name: string }, null>({
    method: 'post',
    path: '/api/sites/multiscreen/unpublish/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  resetSite = APIEndpoint<{ site_name: string }, null>({
    method: 'post',
    path: '/api/sites/multiscreen/reset/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  switchTemplate = APIEndpoint<{
    site_name: string,
    template_id: string
  }, null>({
    method: 'post',
    path: '/api/sites/multiscreen/switchTemplate/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  getByExtId = APIEndpoint<any, any>({
    method: 'get',
    path: '/api/sites/multiscreen/byexternalid/{external_uid}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Site.UpdateSiteOpts, Site.UpdateSiteResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/update/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<{
    template_id: string;
  }, {
    site_name: string;
  }>({
    method: 'post',
    path: '/api/sites/multiscreen/create',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      template_id: {
        type: 'string',
        required: true,
      },
    },
  });

  duplicate = APIEndpoint<{
    site_name: string;
    new_default_domain_prefix: string;
    new_external_uid?: string;
  }, {
    site_name: string;
  }>({
    method: 'post',
    path: '/api/sites/multiscreen/duplicate/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
    bodyParams: {
      new_default_domain_prefix: {
        type: 'string',
        required: true,
      },
      new_external_uid: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default Sites;
export { Sites };
