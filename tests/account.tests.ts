import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Account tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const account = {
    account_name: 'test',
    first_name: 'test',
    last_name: 'test',
    lang: 'en',
    email: 'foo@example.org'
  }

  const permissions = ['EDIT']

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can create an account', () => {
    scope.post('/api/accounts/create', (body) => {
      expect(body).to.eql({ ...account })
      return body
    }).reply(204)

    return duda.accounts.create({ ...account })
  })

  it('can get an account by name', () => {
    scope.get((path: string) => {
      return path === '/api/accounts/test'
  }).reply(200, account)

    return duda.accounts.get({ account_name: 'test' })
      .then(res => expect(res).to.eql({ ...account }))
  })

  it('can update an account by name', () => {
    scope.post('/api/accounts/update/test', (body) => {
      const { account_name, ...rest } = body;
      expect(body).to.eql(rest)
      return body
    }).reply(204)

    return duda.accounts.update({ ...account })
  })

  it('can delete an account by name', () => {
    scope.delete('/api/accounts/test').reply(204)
    return duda.accounts.delete({ account_name: 'test' })
  })

  describe('permissions', () => {
    it('can successfully grant site access for an account by name', () => {
      scope.post('/api/accounts/test_account/sites/test_site/permissions', (body) => {
        const { permissions } = body;
        expect(permissions).to.eql(['EDIT'])
        return body
      }).reply(204)
      return duda.accounts.permissions.grantSiteAccess({
        account_name: 'test_account',
        site_name: 'test_site',
        permissions: ['EDIT']
      })
    })
    it('can successfully get all permissions', () => {
      scope.get('/api/accounts/permissions/multiscreen').reply(200, permissions)
      return duda.accounts.permissions.list()
    })
    it('can get site permissions for an account by name', () => {
      scope.get((path: string) => {
          return path === '/api/accounts/test_account/sites/test_site/permissions'
      }).reply(200, permissions)
    
      return duda.accounts.permissions.get({
        account_name: 'test_account',
        site_name: 'test_site'
      })
        .then(res => expect(res).to.eql(permissions))
    })
  })
})