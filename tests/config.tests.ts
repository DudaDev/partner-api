import nock from "nock"
import { expect } from "chai"
import { Duda } from "../src/index"

describe('Config tests', () => {
    const path = '/api/sites/multiscreen/templates' 
    const user = 'testuser'
    const pass = 'testpass'
    const __bearer = 'abcxyz'

    let duda: Duda;
    let scope: nock.Scope;

    describe('whout a user', () => {
      it('should throw an error', () => {
        expect(new Duda({ env: 'foo' })).to.throw
      })
    })

    describe('with a bearer token', () => {
      before(() => {
        duda = new Duda({
          __bearer,
        })
      })

      describe('authorization header', () => {
        before(() => {

          scope = nock('https://api.duda.co', {
            reqheaders: {
              Authorization: `Bearer ${__bearer}`,
            }
          })
        })

        it('should calculate the correct authorization header', async () => {
          scope.get(path).reply(200, 'Headers matched')
          const res = await duda.templates.list()
          expect(res).to.eql({ data: 'Headers matched'})
        })
      })
    })

    describe('with a user', () => {
      before(() => {
        duda = new Duda({
          user,
          pass,
        })
      })

      describe('default instance', () => {
        before(() => {
          scope = nock('https://api.duda.co')
        })

        it('should default to the direct instance', async () => {
          scope.get(path).reply(200, 'Host matched')
          const res = await duda.templates.list()
          expect(res).to.eql({ data: 'Host matched'})
        })


      })

      describe('authorization header', () => {
        before(() => {

          const buff = Buffer.from(`${user}:${pass}`);
          const base64data = buff.toString('base64');

          scope = nock('https://api.duda.co', {
            reqheaders: {
              authorization: `Basic ${base64data}`,
            }
          })
        })

        it('should calculate the correct authorization header', async () => {
          scope.get(path).reply(200, 'Headers matched')
          const res = await duda.templates.list()
          expect(res).to.eql({ data: 'Headers matched'})
        })
      })

      describe('user agent header', () => {
        before(() => {
          scope = nock('https://api.duda.co', {
            reqheaders: {
              'user-agent': 'd-node-api-library'
            }
          })
        })

        it('should add a user-agent header', async () => {
          scope.get(path).reply(200, 'Headers matched')
          const res = await duda.templates.list()
          expect(res).to.eql({ data: 'Headers matched'})
        })
      })

    })
})