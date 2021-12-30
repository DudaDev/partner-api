import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';
import Rows from './Rows';
import Fields from './Fields';

class Collections extends Resource {
  rows = new Rows(this.__config);

  fields = new Fields(this.__config);

  list = APIEndpoint<Types.ListCollectionsPayload, Types.ListCollectionsPayload>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/collection',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetCollectionPayload, Types.GetCollectionResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<Types.CreateCollectionPayload, Types.CreateCollectionResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/collection',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.UpdateCollectionPayload, Types.UpdateCollectionResponse>({
    method: 'put',
    path: '/api/sites/multiscreen/{site_name}/collection/{current_collection_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<Types.DeleteCollectionPayload, Types.DeleteCollectionResponse>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  clearCache = APIEndpoint<Types.ClearCachePayload, Types.ClearCacheResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/collection/{collection_name}/revalidate',
    defaults: {
      host: 'api.duda.co',
    },
  });

  clearCacheByExtID = APIEndpoint<Types.ClearCacheByExtIdPayload, Types.ClearCacheByExtIdResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/collections/revalidate/{external_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Collections;
export { Collections };
