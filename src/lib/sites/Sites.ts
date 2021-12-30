import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Sites extends Resource {
  get = APIEndpoint<Types.GetSiteByNamePayload, Types.GetSiteResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  publish = APIEndpoint<Types.PublishSitePayload, Types.PublishSiteResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/publish/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteSitePayload, Types.DeleteSiteResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  unpublish = APIEndpoint<Types.UnPublishSitePayload, Types.UnPublishSiteResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/unpublish/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  reset = APIEndpoint<Types.ResetSitePayload, Types.ResetSiteResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/reset/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  switchTemplate = APIEndpoint<Types.SwitchTemplatePayload, Types.SwitchTemplateResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/switchTemplate/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  getByExternalID = APIEndpoint<Types.GetSiteByExtIDPayload, Types.GetSiteResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/byexternalid/{external_uid}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateSitePayload, Types.UpdateSiteResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/update/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateSitePayload, Types.CreateSiteResponse>({
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

  duplicate = APIEndpoint<Types.DuplicateSitePayload, Types.DuplicateSiteResponse>({
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
