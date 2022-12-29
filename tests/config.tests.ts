import nock from "nock"
import { expect } from "chai"
import { Duda } from "../src/index"

describe('Config tests', () => {
    const path = '/api/sites/multiscreen/templates' 
    let duda: Duda;
    let scope: nock.Scope;


    describe('Config defaults', () => {
      before(() => {
          duda = new Duda({
            user: 'testuser',
            pass: 'testpass',
          })

          scope = nock('https://api.duda.co')
      })

      it('should default to the direct instance', async () => {
        scope.get(path).reply(200, 'Host matched')
        const res = await duda.templates.list()
        expect(res).to.eql({ data: 'Host matched'})
      })
    })
})