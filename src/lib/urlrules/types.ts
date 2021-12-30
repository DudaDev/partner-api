export interface URLRule {
  id: string;
  source: string;
  target: string;
  response_code: number;
}

export interface GetAllURLRulesPayload {
  site_name: string;
}

export interface GetAllURLRulesResponse {
  site_name: string;
  results: Array<URLRule>;
}

export interface GetURLRuleByIDPayload {
  site_name: string;
  id: string;
}

export interface GetURLRuleByIDResponse {
  site_name: string;
  results: Array<URLRule>;
}

export interface CreateURLRulePayload {
  site_name: string;
  source: string;
  target: string;
  response_code: number;
}

export interface CreateURLRuleResponse {
  site_name: string;
  results: Array<URLRule>;
}

export interface UpdateURLRulePayload {
  site_name: string;
  id: string;
  source: string;
  target: string;
  response_code: number;
}

export interface UpdateURLRuleResponse {
  site_name: string;
  results: Array<URLRule>;
}

export interface DeleteURLRulePayload {
  site_name: string;
  id: string;
}

export interface DeleteURLRuleResponse {
}
