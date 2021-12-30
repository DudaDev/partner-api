import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Analytics extends Resource {
  get = APIEndpoint<Types.GetAnalyticsHistoryPayload, Types.GetAnalyticsHistoryResponse>({
    method: 'get',
    path: '/api/analytics/site/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Analytics;
export { Analytics };
