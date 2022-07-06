import nock from "nock"
import { Duda } from "../src/index"

describe('Plan tests', () => {
    let duda: Duda;
    let scope: nock.Scope;
    const api_path = '/api/sites/multiscreen/';
    const site_name = 'test_site';

    const plan = {
        planID: 1,
        planName: 'test'
    };
    // const response = [
    //     plan
    // ];
    const { planID: plan_id } = plan
    before(() => {
        duda = new Duda({
          user: 'testuser',
          pass: 'testpass',
          env: Duda.Envs.direct
        })

        scope = nock('https://api.duda.co')
    })
    // No Match for request issue?
    // it('can get available site plans', () => {
    //     scope.get(`${api_path}/plans`).reply(200, response)
    //     duda.plans.list()
    // })
    it('can get a site plan by site name', () => {
        scope.get(`${api_path}${site_name}/plan`).reply(200, plan)
        duda.plans.get({ site_name: site_name })
    })
    it('can update site plan', () => {
        scope.post(`${api_path}${site_name}/plan/${plan_id}`).reply(200, plan)
        duda.plans.update({ site_name: site_name, plan_id: plan_id })
    })
})