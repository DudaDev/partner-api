import * as Types from './types';
import Resource from '../base';

import { APIEndpoint } from '../APIEndpoint';

class Sections extends Resource {
  list = APIEndpoint<Types.ListSectionPayload, Types.ListSectionResponse>({
    method: 'get',
    path: '/api/sections',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<Types.GetSectionPayload, Types.GetSectionResponse>({
    method: 'get',
    path: '/api/sections/{section_uuid}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default Sections;
export { Sections };
