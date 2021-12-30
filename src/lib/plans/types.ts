export interface Plan {
  planId: number,
  planName: string
}

export type ListPlanResponse = Array<Plan>;

export interface GetPlanPayload {
  site_name: string;
}

export interface GetPlanResponse extends Plan {
}

export interface ChangePlanPayload {
  site_name: string,
  plan_id: number
}

export interface ChangePlanResponse extends Plan {
}
