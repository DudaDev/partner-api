import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App store blog tests', () => {
  const base_path = '/api/integrationhub/application'
  const site_name = 'test_site'
  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'
  const post_id = 'post_id'

  const blog = {
    name: "string",
    title: "string",
    description: "string",
    image: "string",
    image_alt_text: "string"
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
    title: "string",
    schedule_publish_date: "string"
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
    schedule_publish_date: "string",
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

  const list_blog_posts_with_content = {
    limit: 1,
    offset: 0,
    results: [{ ...blog_post, content: "string" }],
    total_responses: 1
  }

  let duda: Duda;
  let scope: nock.Scope;

  before(() => {
    duda = new Duda({
      user,
      pass,
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co', {
      reqheaders: {
        'x-duda-access-token': `Bearer ${token}`
      }
    })
  })

  it('can get a blog', async () => {
    scope.get(`${base_path}/site/${site_name}/blog`).reply(200, blog)
    return await duda.appstore.blog.get({
      site_name,
      token
    }).then(res => expect(res).to.eql(blog))
  })

  it('can import a blog post', async () => {
    scope.post(`${base_path}/site/${site_name}/blog/posts/import`, (body) => {
      expect(body).to.eql({ ...import_blog_post_object })
      return body
    }).reply(200, import_blog_post_object)

    return await duda.appstore.blog.posts.import({
      site_name,
      title: 'title',
      description: 'description',
      content: 'content',
      author: 'author',
      thumbnail: {
        url: 'url'
      },
      main_image: {
        url: 'url'
      },
      token
    })
  })

  it('can publish a blog post', async () => {
    scope.post(`${base_path}/site/${site_name}/blog/posts/${post_id}/publish`).reply(204)
    return await duda.appstore.blog.posts.publish({
      site_name,
      post_id,
      token
    })
  })

  it('can unpublish a blog post', async () => {
    scope.post(`${base_path}/site/${site_name}/blog/posts/${post_id}/unpublish`).reply(204)
    return await duda.appstore.blog.posts.unpublish({
      site_name,
      post_id,
      token
    })
  })

  it('can update a blog post', async () => {
    scope.patch(`${base_path}/site/${site_name}/blog/posts/${post_id}`).reply(200, blog_post)
    return await duda.appstore.blog.posts.update({
      site_name,
      post_id,
      ...update_blog_post_payload,
      token
    }).then(res => expect(res).to.eql(blog_post))
  })

  it('can list all blog posts', async () => {
    scope.get(`${base_path}/site/${site_name}/blog/posts?limit=1&offset=0`).reply(200, list_blog_posts)
    return await duda.appstore.blog.posts.list({
      site_name,
      limit: 1,
      offset: 0,
      token
    }).then(res => expect(res).to.eql(list_blog_posts))
  })

  it('can list all blog posts with their content', async () => {
    scope.get(`${base_path}/site/${site_name}/blog/posts?limit=1&offset=0&content=true`).reply(200, list_blog_posts_with_content)
    return await duda.appstore.blog.posts.list({
      site_name,
      limit: 1,
      offset: 0,
      content: true,
      token
    }).then(res => expect(res).to.eql(list_blog_posts_with_content))
  })

  it('can get a blog post', async () => {
    scope.get(`${base_path}/site/${site_name}/blog/posts/${post_id}`).reply(200, blog_post)
    return await duda.appstore.blog.posts.get({
      site_name,
      post_id,
      token
    }).then(res => expect(res).to.eql(blog_post))
  })

  it('can delete a blog post', async () => {
    scope.delete(`${base_path}/site/${site_name}/blog/posts/${post_id}`).reply(204)
    return await duda.appstore.blog.posts.delete({
      site_name,
      post_id,
      token
    })
  })
})
