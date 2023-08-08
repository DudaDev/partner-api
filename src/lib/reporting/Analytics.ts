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
    queryParams: {
      from: {
        type: 'string',
        required: false,
      },
      to: {
        type: 'string',
        required: false,
      },
      result: {
        type: 'string',
        required: false,
      },
      dimension: {
        type: 'string',
        required: false,
      },
      dateGranularity: {
        type: 'string',
        required: false,
      },
    },
  });
}

export default Analytics;
export { Analytics };
