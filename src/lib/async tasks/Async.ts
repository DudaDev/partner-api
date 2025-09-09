import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Async extends Resource {

  generate = APIEndpoint<Types.GenerateAsyncPayload, Types.GenerateAsyncResponse>({
    method: 'post',
    path: '/api/async-tasks/generate-site-with-ai',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetAsyncPayload, Types.GetAsyncResponse>({
    method: 'get',
    path: '/api/async-tasks/{task_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Async;
export { Async };
