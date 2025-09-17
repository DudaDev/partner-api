import { expect } from "chai"
import nock from "nock"
import { Duda } from "../src/index"

describe('Async Tasks tests', () => {
  let duda: Duda;
  let scope: nock.Scope;

  const site_id = 'test_site';
  const task_id = 'test_task';

  const additional_ai_context = {
    max_pages: 1
  }

  const business_data = {
    category: 'string',
    data_controller: 'string',
    description: 'string',
    logo_url: 'string',
    name: 'string',
    service_area: 'string',
    tone_of_voice: 'string'
  }

  const labels = {
    name: 'string'
  }

  const site_alternate_domains = {
    domains: ['example2.org', 'example3.org'],
    is_redirect: true
  }

  const site_business_info_address = {
    street: 'Canon St',
    state: 'CO',
    city: 'Louisville',
    country: 'US',
    zip_code: '80027'
  }

  const site_business_info = {
    business_name: 'My Business',
    phone_number: '555-123-4567',
    email: 'me@example.org',
    address: site_business_info_address
  }

  const site_seo = {
    og_image: 'https://example.org/path/to/image.png',
    title: 'My Title',
    description: 'My long description'
  }

  const site_data = {
    external_uid: 'string',
    google_tracking_id: 'string',
    googletagmanager_container_id: ['string'],
    site_alternate_domains: site_alternate_domains,
    site_business_info: site_business_info,
    site_seo: site_seo,
    site_domain: 'example.org'
  }

  const colors_obj = {
      id: "color_1",
      value: "xffffff",
      label: "test_label"
  }

  const theme_text = {
      h1: {
        font_family: "string",
        font_size: "string",
        font_weight: "string",
        color: "string",
        line_height: "string",
        letter_spacing: "string",
        text_decoration: "string",
        font_style: "string",
        breakpoints: {
          mobile: {
              font_size: "string"
          }
        }
      }
  }

  const theme = {
    colors: [colors_obj],
    text: theme_text 
  }

  const generate_ai_site_payload = {
    additional_ai_context: additional_ai_context,
    business_data: business_data,
    default_domain_prefix: 'string',
    do_not_gen_ssl: true,
    labels: [labels],
    lang: 'en',
    site_data: site_data,
    theme: theme
  }

  const generate_ai_site_response = {
    id: task_id,
    type: 'GENERATE_SITE_WITH_AI',
    status: 'STARTED',
    created_at: 'string'
  }

  const get_async_task_response = {
    id: task_id,
    type: 'GENERATE_SITE_WITH_AI',
    status: 'COMPLETED',
    result: {
      site_name: site_id
    },
    created_at: 'string',
    finished_at: 'string'
  }

  before(() => {
    duda = new Duda({
      user: 'testuser',
      pass: 'testpass',
      env: Duda.Envs.direct
    })

    scope = nock('https://api.duda.co')
  })

  it('can generate a site with AI', async () => {
    scope.post(`/api/async-tasks/generate-site-with-ai`, (body) => {
      expect(body).to.eql({ ...generate_ai_site_payload })
      return body
    }).reply(200, generate_ai_site_response)

    return await duda.async.generate({ ...generate_ai_site_payload })
  })

  it('can get an async task', async () => {
    scope.get(`/api/async-tasks/${task_id}`).reply(200, get_async_task_response)

    return await duda.async.get({ task_id })
      .then(res => expect(res).to.eql({ ...get_async_task_response }))
  })
})