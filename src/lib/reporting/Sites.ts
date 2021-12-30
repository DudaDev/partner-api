import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class SiteReporting extends Resource {
  created = APIEndpoint<Types.GetSitesCreatedPayload, Types.GetSitesCreatedResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/created',
    defaults: {
      host: 'api.duda.co',
    },
  });

  published = APIEndpoint<Types.GetPublishedPayload, Types.GetPublishedResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/published',
    defaults: {
      host: 'api.duda.co',
    },
  });

  unpublished = APIEndpoint<Types.GetUnpublishedPayload, Types.GetUnpublishedResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/unpublished',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default SiteReporting;
export { SiteReporting };
