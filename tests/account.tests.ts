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
  const sites = [{ site_name:'test_site' }]
  const groups = [
    {
      group_name: 'test',
      color: 'test',
      title: 'test',
      permissions: permissions
    }
  ]
  const url = 'test_url.com'
  const sso_url = {
    url: url
  }

  const rest_url = {
    reset_url: url
  }

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
    it('can grant site access for an account by name', () => {
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
    it('can get all permissions', () => {
      scope.get('/api/accounts/permissions/multiscreen').reply(200, permissions)
      return duda.accounts.permissions.list()
    })
    it('can get site permissions for an account by name', () => {
      scope.get('/api/accounts/test_account/sites/test_site/permissions').reply(200, permissions)
      return duda.accounts.permissions.get({
        account_name: 'test_account',
        site_name: 'test_site'
      })
    })
    it('can get all accessible sites for an account by name', () => {
      scope.get('/api/accounts/grant-access/test_account/sites/multiscreen').reply(200, sites)
      return duda.accounts.permissions.listAccessibleSites({ account_name: 'test_account' })
    })
    it('can remove site access for an account by name', () => {
      scope.delete('/api/accounts/test_account/sites/test_site/permissions').reply(204)
      return duda.accounts.permissions.removeSiteAccess({
        account_name: 'test_account',
        site_name: 'test_site'
      })
    })
    it('can list all duda team member groups', () => {
      scope.get('/api/permission-groups/default').reply(200, groups)
      return duda.accounts.permissions.listDudaTeamGroups()
    })
    it('can list all custom team member groups', () => {
      scope.get('/api/permission-groups/custom').reply(200, groups)
      return duda.accounts.permissions.listCustomTeamGroups()
    })
  })
  describe('authentication', () => {
    it('can grant single sign-on access for an account by name', () => {
      scope.get('/api/accounts/sso/test_account/link?site_name=test_site&target=STATS').reply(200, sso_url)

      return duda.accounts.authentication.getSSOLink({
        account_name: 'test_account',
        site_name: 'test_site',
        target: 'STATS'
      }).then(res => expect(res).to.eql(sso_url))
    })

    it('can reset a password for an account by name', () => {
      scope.post('/api/accounts/reset-password/test_account').reply(200, rest_url)
      return duda.accounts.authentication.getResetPasswordLink({ account_name:'test_account' })
    })
  })
})