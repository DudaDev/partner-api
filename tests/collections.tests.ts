import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Account tests', () => {
    let duda: Duda;
    let scope: nock.Scope;

    before(() => {
        duda = new Duda({
          user: 'testuser',
          pass: 'testpass',
          env: Duda.Envs.direct
        })

        scope = nock('https://api.duda.co')
    })
    it('can create a collection', () => {

    })
})