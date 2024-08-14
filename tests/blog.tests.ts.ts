import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Blog tests', () => {
  let duda: Duda;
  let scope: nock.Scope;
  const api_path = '/api/sites/multiscreen';
  const site_name = 'site_name'

  const import_blog_object = {
    feed_url: 'feed_url',
    import_type: 'APPEND'
  }

  const import_blog_post_object = {
    title: 'title',
    description: 'description',
    content: 'content',
    author: 'author',
    thumbnail: {
      url: 'url'
    },
    main_image: {
      url: 'url'
    }
  }

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can import a blog', async () => {
    scope.post(`${api_path}/${site_name}/blog/import`, (body) => {
        expect(body).to.eql({ ...import_blog_object })
        return body
    }).reply(200, import_blog_object)
   return await duda.blog.import({
    site_name: site_name,
    feed_url: 'feed_url',
    import_type: 'APPEND'
   })
  })

  it('can import a blog post', async () => {
    scope.post(`${api_path}/${site_name}/blog/posts/import`, (body) => {
        expect(body).to.eql({ ...import_blog_post_object })
        return body
    }).reply(200, import_blog_post_object)
   return await duda.blog.importPost({
    site_name: site_name,
    title: 'title',
    description: 'description',
    content: 'content',
    author: 'author',
    thumbnail: {
      url: 'url'
    },
    main_image: {
      url: 'url'
    }
   })
  })

  it('can delete a blog', async () => {
    scope.delete(`${api_path}/${site_name}/blog`).reply(204)
    return await duda.blog.delete({
      site_name: site_name,
      delete_backups: true
    })
  })
})