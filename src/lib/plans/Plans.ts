import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Plans extends Resource {
  list = APIEndpoint<null, Types.ListPlanResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/plans',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetPlanPayload, Types.GetPlanResponse>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}/plans',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<Types.ChangePlanPayload, Types.ChangePlanResponse>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}/plans/{plan_id}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Plans;
export { Plans };
