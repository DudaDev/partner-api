import * as Types from './types';
import { TokenRequest } from '../types';
import {SubResource} from '../../base';

import { APIEndpoint } from '../../APIEndpoint';
import AppRows from './Rows';
import AppFields from './Fields';

class AppCollections extends SubResource {
  rows = new AppRows(this.base);

  fields = new AppFields(this.base);

  list = APIEndpoint<TokenRequest<Types.ListCollectionsPayload>, Types.ListCollectionsPayload>({
    method: 'get',
    path: '/site/{site_name}/collection',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  get = APIEndpoint<TokenRequest<Types.GetCollectionPayload>, Types.GetCollectionResponse>({
    method: 'get',
    path: '/site/{site_name}/collection/{collection_name}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  create = APIEndpoint<TokenRequest<Types.CreateCollectionPayload>, Types.CreateCollectionResponse>({
    method: 'post',
    path: '/site/{site_name}/collection',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  update = APIEndpoint<TokenRequest<Types.UpdateCollectionPayload>, Types.UpdateCollectionResponse>({
    method: 'put',
    path: '/site/{site_name}/collection/{current_collection_name}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  publish = APIEndpoint<TokenRequest<Types.PublishCollectionPayload>, Types.PublishCollecitonResponse>({
    method: 'post',
    path: '/site/{site_name}/collection/{collection_name}/publish',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  delete = APIEndpoint<TokenRequest<Types.DeleteCollectionPayload>, Types.DeleteCollectionResponse>({
    method: 'delete',
    path: '/site/{site_name}/collection/{collection_name}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  clearCache = APIEndpoint<TokenRequest<Types.ClearCachePayload>, Types.ClearCacheResponse>({
    method: 'post',
    path: '/site/{site_name}/collection/{collection_name}/revalidate',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });

  clearCacheByExtID = APIEndpoint<TokenRequest<Types.ClearCacheByExtIdPayload>, Types.ClearCacheByExtIdResponse>({
    method: 'post',
    path: '/site/collections/revalidate/{external_id}',
    defaults: {
      host: 'api.duda.co',
    },
    headerOptions: {
      'X-DUDA-ACCESS-TOKEN': {
        required: true,
      },
    },
  });
}

export default AppCollections;
export { AppCollections };
