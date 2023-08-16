import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Reporting tests', () => {
    let duda: Duda;
    let scope: nock.Scope;
    const api_path = '/api/sites/multiscreen/';
    const site_name = 'test_site';
    const account_name = 'test_account';

    const lastDays = '1';
    const from = '2021-01-01';
    const to = '2021-12-01';
    const list = ['test_site'];
    const frequency = 'WEEKLY';

    const dimension = 'system';
    const result = 'traffic';
    const date_granularity = 'WEEKS';

    const limit = 1;
    const offset = 0;
    const activity = 'site_created';

    const form = [
        {
            form_title: 'test',
            message: {},
            date: 'date'
        }
    ]
    const email = { frequency: frequency }

    const analytics = {
        UNIQUE_VISITORS: 0,
        VISITS: 0,
        PAGE_VIEWS: 0,
    }

    const analyticsResponse = [
        {
            dimension: {
                browser: 'browser',
                os: 'os'
            },
            data: analytics
        }
    ]

    const activitiesResponse = {
        site_name: site_name,
        results: [
            {
                date: '0',
                activity: activity,
                source: 'source',
                account_name: account_name
            }
        ]
    }

    before(() => {
        duda = new Duda({
          user: 'testuser',
          pass: 'testpass',
          env: Duda.Envs.direct
        })

        scope = nock('https://api.duda.co')
    })
    it('can get a list of recently published sites', async () => {
        scope.get(`${api_path}published`, (query) => {
            expect(query).to.eql({ lastDays: lastDays })
            return query
        }).reply(200, list)
        return await duda.reporting.sites.published({ lastDays: lastDays})
    })
    it('can get a list of recently unpublished sites', async () => {
        scope.get(`${api_path}unpublished`, (query) => {
            expect(query).to.eql({ lastDays: lastDays })
            return query
        }).reply(200, list)
        return await duda.reporting.sites.unpublished({ lastDays: lastDays })
    })
    it('can get a list of created sites', async () => {
        scope.get(`${api_path}created`, (query) => {
            expect(query).to.eql({ from: from, to: to })
            return query
        }).reply(200, list)
        return await duda.reporting.sites.created({ from: from, to: to })
    })
    it('can get a list of form submissions', async () => {
        scope.get(`${api_path}get-forms/${site_name}`, (query) => {
            expect(query).to.eql({ from: from, to: to })
            return query
        }).reply(200, form)
        return await duda.reporting.forms.submissions({ site_name: site_name, from: from, to: to })
    })
    it('can subscribe a customer to a site', async () => {
        scope.post(`/api/accounts/${account_name}/sites/${site_name}/stats-email`, (body) => {
            expect(body).to.eql({ frequency: frequency })
            return body
        }).reply(204)
        return await duda.reporting.emailSettings.subscribe({
            account_name: account_name,
            site_name: site_name,
            frequency: frequency
        })
    })
    it('can unsubscribe a customer to a site', async () => {
        scope.delete(`/api/accounts/${account_name}/sites/${site_name}/stats-email`).reply(204)
        return await duda.reporting.emailSettings.unsubscribe({
            account_name: account_name,
            site_name: site_name
        })
    })
    it('can get email settings for an account', async () => {
        scope.get(`/api/accounts/${account_name}/sites/${site_name}/stats-email`).reply(200, email)
        return await duda.reporting.emailSettings.get({ account_name: account_name, site_name: site_name })
    })
    describe('analytics', async () => {
        it('can get analytics history for a site', async () => {
            scope.get(`/api/analytics/site/${site_name}?from=2021-01-01&to=2021-12-01&dimension=system&result=traffic&dateGranularity=WEEKS`).reply(200, analyticsResponse)
      
            return await duda.reporting.analytics.get({
                site_name: site_name,
                from: from,
                to: to,
                dimension: dimension,
                result: result,
                date_granularity: date_granularity
            }).then(res => expect(res).to.eql(analyticsResponse))
          })
    })
    describe('activities', () => {
        it('can get activity history for a site', async () => {
            scope.get(`${api_path}${site_name}/activities?limit=1&offset=0&from=2021-01-01&to=2021-12-01&activities=site_created`).reply(200, activitiesResponse)
      
            return await duda.reporting.activities.get({
                site_name: site_name,
                limit: limit,
                offset: offset,
                from: from,
                to: to,
                activities: [activity]
            }).then(res => expect(res).to.eql(activitiesResponse))
          })
    })
})