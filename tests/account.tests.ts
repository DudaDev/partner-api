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

  const welcome_url = {
    welcome_url: url
  }

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can create an account', async () => {
    scope.post('/api/accounts/create', (body) => {
      expect(body).to.eql({ ...account })
      return body
    }).reply(204)

    return await duda.accounts.create({ ...account })
  })

  it('can get an account by name', async () => {
    scope.get((path: string) => {
      return path === '/api/accounts/test'
  }).reply(200, account)

    return await duda.accounts.get({ account_name: 'test' })
      .then(res => expect(res).to.eql({ ...account }))
  })

  it('can update an account by name', async () => {
    scope.post('/api/accounts/update/test', (body) => {
      const { account_name, ...rest } = body;
      expect(body).to.eql(rest)
      return body
    }).reply(204)

    return await duda.accounts.update({ ...account })
  })

  it('can delete an account by name', async () => {
    scope.delete('/api/accounts/test').reply(204)
    return await duda.accounts.delete({ account_name: 'test' })
  })

  describe('permissions', () => {
    it('can grant site access for an account by name', async () => {
      scope.post('/api/accounts/test_account/sites/test_site/permissions', (body) => {
        const { permissions } = body;
        expect(permissions).to.eql(['EDIT'])
        return body
      }).reply(204)
      return await duda.accounts.permissions.grantSiteAccess({
        account_name: 'test_account',
        site_name: 'test_site',
        permissions: ['EDIT']
      })
    })
    it('can get all permissions', async () => {
      scope.get('/api/accounts/permissions/multiscreen').reply(200, permissions)
      return await duda.accounts.permissions.list()
    })
    it('can get site permissions for an account by name', async () => {
      scope.get('/api/accounts/test_account/sites/test_site/permissions').reply(200, permissions)
      return await duda.accounts.permissions.get({
        account_name: 'test_account',
        site_name: 'test_site'
      })
    })
    it('can get all accessible sites for an account by name', async () => {
      scope.get('/api/accounts/grant-access/test_account/sites/multiscreen').reply(200, sites)
      return await duda.accounts.permissions.listAccessibleSites({ account_name: 'test_account' })
    })
    it('can remove site access for an account by name', async () => {
      scope.delete('/api/accounts/test_account/sites/test_site/permissions').reply(204)
      return await duda.accounts.permissions.removeSiteAccess({
        account_name: 'test_account',
        site_name: 'test_site'
      })
    })
    it('can list all duda team member groups', async () => {
      scope.get('/api/permission-groups/default').reply(200, groups)
      return await duda.accounts.permissions.listDudaTeamGroups()
    })
    it('can list all custom team member groups', async () => {
      scope.get('/api/permission-groups/custom').reply(200, groups)
      return await duda.accounts.permissions.listCustomTeamGroups()
    })
  })
  describe('authentication', () => {
    it('can grant single sign-on access for an account by name', async () => {
      scope.get('/api/accounts/sso/test_account/link?site_name=test_site&target=STATS').reply(200, sso_url)

      return await duda.accounts.authentication.getSSOLink({
        account_name: 'test_account',
        site_name: 'test_site',
        target: 'STATS'
      }).then(res => expect(res).to.eql(sso_url))
    })

    it('can create a reset paassword link for an account by name', async () => {
      scope.post('/api/accounts/reset-password/test_account').reply(200, rest_url)
      return await duda.accounts.authentication.getResetPasswordLink({ account_name:'test_account' })
    })

    it('can create a welcome link for an account by name', async () => {
      scope.post('/api/accounts/test_account/welcome').reply(200, welcome_url)
      return await duda.accounts.authentication.getWelcomeLink({ account_name:'test_account' })
    })
  })
})