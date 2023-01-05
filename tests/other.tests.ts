import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Other tests', () => {
    let duda: Duda;
    let scope: nock.Scope;

    const backup = [
        {
            date: 'test_date',
            name: 'test_name'
        }
    ]
    const name = {
        name: 'test_name'
    }

    before(() => {
        duda = new Duda({
            user: 'testuser',
            pass: 'testpass',
            env: Duda.Envs.direct
        })
  
        scope = nock('https://api.duda.co')
    })
    it('can get all backups for a site', async () => {
        scope.get('/api/sites/multiscreen/backups/test_site').reply(200, backup)
        return await duda.other.backups.list({ site_name:'test_site' })
    })
    it('can create a backup for a site', async () => {
        scope.post('/api/sites/multiscreen/backups/test_site/create', (body) => {
            expect(body).to.eql(name)
            return body
        }).reply(200, {name})

        return await duda.other.backups.create({
            site_name: 'test_site',
            name: 'test_name'
        })
    })
    it('can restore a backup for a site', async () => {
        scope.post('/api/sites/multiscreen/backups/test_site/restore/test_backup').reply(204)
        return await duda.other.backups.restore({
            site_name: 'test_site',
            backup_name: 'test_backup',
        })
    })
    it('can delete a backup for a site', async () => {
        scope.delete('/api/sites/multiscreen/backups/test_site/test_backup').reply(204)
        return await duda.other.backups.delete({
            site_name: 'test_site',
            backup_name: 'test_backup'
        })
    })
    describe('ssl', () => {
        it('can generate an ssl cert for a site', async () => {
            scope.post('/api/sites/multiscreen/test_site/certificate').reply(204)
            return await duda.other.ssl.create({ site_name:'test_site' })
        })
        it('can renew an ssl cert for a site', async () => {
            scope.post('/api/sites/multiscreen/test_site/certificate/renew').reply(204)
            return await duda.other.ssl.renew({ site_name:'test_site' })
        })
        it('can delete an ssl cert for a site', async () => {
            scope.delete('/api/sites/multiscreen/test_site/certificate').reply(204)
            return await duda.other.ssl.delete({ site_name:'test_site' })
        })
    })
})