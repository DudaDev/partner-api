import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Blog tests', () => {
  let duda: Duda;
  let scope: nock.Scope;
  const api_path = '/api/sites/multiscreen';
  const site_name = 'site_name'
  const post_id = 'post_id'

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

  const update_blog_post_payload = {
    author_name: "string",
    description: "string",
    meta_title: "string",
    no_index: true,
    path: "string",
    publish_date: "string",
    tags: ["string"],
    title: "string"
  }

  const blog_post = {
    author_name: "string",
    creation_date: "string",
    description: "string",
    id: "string",
    meta_title: "string",
    no_index: true,
    path: "string",
    publish_date: "string",
    status: "string",
    tags: ["string"],
    title: "string",
    main_image: {
      url: "string"
    },
    thumbnail: {
      url: "string"
    }
  }

  const list_blog_posts = {
    limit: 1,
    offset: 0,
    results: [blog_post],
    total_responses: 1
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

  it('can publish a blog post', async () => {
    scope.post(`${api_path}/${site_name}/blog/posts/${post_id}/publish`).reply(204)
    return await duda.blog.publish({
      site_name: site_name,
      post_id: post_id
    })
  })

  it('can unpublish a blog post', async () => {
    scope.post(`${api_path}/${site_name}/blog/posts/${post_id}/unpublish`).reply(204)
    return await duda.blog.unpublish({
      site_name: site_name,
      post_id: post_id
    })
  })

  it('can update a blog post', async () => {
    scope.patch(`${api_path}/${site_name}/blog/posts/${post_id}`).reply(200, blog_post)
    return await duda.blog.update({
      site_name: site_name,
      post_id: post_id,
      ...update_blog_post_payload
    }).then(res => expect(res).to.eql(blog_post))
  })

  it('can list all blog posts', async () => {
    scope.get(`${api_path}/${site_name}/blog/posts?limit=1&offset=0`).reply(200, list_blog_posts)
    return await duda.blog.list({
      site_name: site_name,
      limit: 1,
      offset: 0
    }).then(res => expect(res).to.eql(list_blog_posts))
  })

  it('can get a blog post', async () => {
    scope.get(`${api_path}/${site_name}/blog/posts/${post_id}`).reply(200, blog_post)
    return await duda.blog.get({
      site_name: site_name,
      post_id: post_id
    }).then(res => expect(res).to.eql(blog_post))
  })

  it('can delete a blog post', async () => {
    scope.delete(`${api_path}/${site_name}/blog/posts/${post_id}`).reply(204)
    return await duda.blog.deletePost({
      site_name: site_name,
      post_id: post_id
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