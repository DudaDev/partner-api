import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';
import MultiLocation from './MultiLocation';
import InjectedContent from './InjectedContent';

class Content extends Resource {
  multilocation = new MultiLocation(this.config);

  injectedContent = new InjectedContent(this.config);

  get = APIEndpoint<Types.GetContentPayload, Types.ContentLibraryResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/content',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateContentPayload, Types.UpdateContentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/content',
    defaults: {
      host: 'api.duda.co',
    },
  });

  publish = APIEndpoint<Types.PublishContentPayload, Types.PublishContentResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/content/publish',
    defaults: {
      host: 'api.duda.co',
    },
  });

  uploadResource = APIEndpoint<Types.UploadResourcePayload, Types.UploadResourceResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/resources/{site_name}/upload',
    defaults: {
      host: 'api.duda.co',
    },
    beforeRequest(opts) {
      return opts.raw_body;
    },
  });
}

export default Content;
export { Content };
