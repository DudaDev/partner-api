import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Snippets extends Resource {
  list = APIEndpoint<Types.ListSnippetsPayload, Types.ListSnippetsResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/snippets',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetSnippetPayload, Types.GetSnippetResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/snippets/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateSnippetPayload, Types.CreateSnippetResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/snippets',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateSnippetPayload, Types.UpdateSnippetResponse>({
    method: 'patch',
    path: '/api/sites/multiscreen/{site_name}/snippets/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  publish = APIEndpoint<Types.PublishSnippetPayload, Types.PublishSnippetResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/snippets/{id}/publish',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteSnippetPayload, Types.DeleteSnippetResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/snippets/{id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Snippets;
export { Snippets };
