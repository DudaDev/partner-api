import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Reporting tests', () => {
    let duda: Duda;
    let scope: nock.Scope;
    const api_path = '/api/sites/multiscreen/';

    const from = '0';
    const to = '1';
    const list = ['test_site'];

    before(() => {
        duda = new Duda({
          user: 'testuser',
          pass: 'testpass',
          env: Duda.Envs.direct
        })

        scope = nock('https://api.duda.co')
    })
    it('can get a list of recently published sites', () =>{
        scope.get(`${api_path}created`, (query) => {
            expect(query).to.eql({ from: from, to: to })
            return query
        }).reply(200, list)
        duda.reporting.sites.created({ from: from, to: to })
    })
})