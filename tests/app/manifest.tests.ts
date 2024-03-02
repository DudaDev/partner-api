import nock from "nock"
import { expect } from "chai"
import { Duda } from "../../src/index"

describe('App store manifest tests', () => {
  const base_path = '/api/integrationhub/application' 
  const user = 'testuser'
  const pass = 'testpass'
  const token = '123456'

  const app_uuid = 'test_uuid'

  const manifest = {
    app_plans: [
      {
        is_hidden: true,
        plan_grade: 0,
        plan_profiles: {
          additionalProp1: {
            plan_features: [
              "string"
            ],
            plan_name: "string",
            plan_subtitle: "string"
          },
          additionalProp2: {
            plan_features: [
              "string"
            ],
            plan_name: "string",
            plan_subtitle: "string"
          },
          additionalProp3: {
            plan_features: [
              "string"
            ],
            plan_name: "string",
            plan_subtitle: "string"
          }
        },
        plan_type: "FREE",
        plan_uuid: "string"
      }
    ],
    app_profile: {
      additionalProp1: {
        app_logo: "string",
        app_long_description: "string",
        app_name: "string",
        app_screenshots: [
          {
            alt_text: "string",
            image_url: "string"
          }
        ],
        app_short_description: "string",
        privacy_note_page: "string",
        public_page: "string",
        terms_of_service_page: "string"
      },
      additionalProp2: {
        app_logo: "string",
        app_long_description: "string",
        app_name: "string",
        app_screenshots: [
          {
            alt_text: "string",
            image_url: "string"
          }
        ],
        app_short_description: "string",
        privacy_note_page: "string",
        public_page: "string",
        terms_of_service_page: "string"
      }
    },
    base_sso_url: "string",
    categories: [
      "string"
    ],
    default_plan_uuid: "string",
    installation_endpoint: "string",
    is_in_beta: true,
    public_key: "string",
    required_fields: [
      "string"
    ],
    scopes: [
      "string"
    ],
    supported_locales: [
      "string"
    ],
    uninstallation_endpoint: "string",
    updowngrade_installation_endpoint: "string",
    uuid: "string",
    visible_to_clients: true,
    webhooks: {
      endpoint: "string",
      events: [
        "PUBLISH"
      ]
    },
    window_type: "IFRAME",
    wl_app_profile: {
      additionalProp1: {
        app_logo: "string",
        app_long_description: "string",
        app_name: "string",
        app_screenshots: [
          {
            alt_text: "string",
            image_url: "string"
          }
        ],
        app_short_description: "string",
        privacy_note_page: "string",
        public_page: "string",
        terms_of_service_page: "string"
      },
      additionalProp2: {
        app_logo: "string",
        app_long_description: "string",
        app_name: "string",
        app_screenshots: [
          {
            alt_text: "string",
            image_url: "string"
          }
        ],
        app_short_description: "string",
        privacy_note_page: "string",
        public_page: "string",
        terms_of_service_page: "string"
      }
    }
  };

  let duda: Duda;
  let scope: nock.Scope;

  before(() => {
    duda = new Duda({
      user,
      pass,
      env: Duda.Envs.direct,
    })

    scope = nock('https://api.duda.co', {
      reqheaders: {
        'x-duda-access-token': `Bearer ${token}`
      }
    })
  })

  it('can get the manifest of an app', async () => {
    scope.get(`${base_path}/${app_uuid}`).reply(200, manifest)

    return await duda.appstore.manifest.get({ app_uuid, token })
      .then(res => expect(res).to.eql({ ...manifest }))
  })

  // it('can update the manifest of an app', async () => {
  //   scope.post(`${base_path}/${app_uuid}`, (body) => {
  //     expect(body).to.eql({ ...manifest })
  //     return body
  //   }).reply(200)

  //   return await duda.appstore.manifest.update({ app_uuid, token, ...manifest })
  // })

  it('can update the manifest of an app', async () => {
    scope.post(`${base_path}/${app_uuid}`, (body) => {
      expect(body).to.eql({ ...manifest })
      return body
    }).reply(200)

    return await duda.appstore.manifest.update({
      app_uuid: app_uuid,
      token: token,
      app_plans: [
        {
          is_hidden: true,
          plan_grade: 0,
          plan_profiles: {
            additionalProp1: {
              plan_features: [
                "string"
              ],
              plan_name: "string",
              plan_subtitle: "string"
            },
            additionalProp2: {
              plan_features: [
                "string"
              ],
              plan_name: "string",
              plan_subtitle: "string"
            },
            additionalProp3: {
              plan_features: [
                "string"
              ],
              plan_name: "string",
              plan_subtitle: "string"
            }
          },
          plan_type: "FREE",
          plan_uuid: "string"
        }
      ],
      app_profile: {
        additionalProp1: {
          app_logo: "string",
          app_long_description: "string",
          app_name: "string",
          app_screenshots: [
            {
              alt_text: "string",
              image_url: "string"
            }
          ],
          app_short_description: "string",
          privacy_note_page: "string",
          public_page: "string",
          terms_of_service_page: "string"
        },
        additionalProp2: {
          app_logo: "string",
          app_long_description: "string",
          app_name: "string",
          app_screenshots: [
            {
              alt_text: "string",
              image_url: "string"
            }
          ],
          app_short_description: "string",
          privacy_note_page: "string",
          public_page: "string",
          terms_of_service_page: "string"
        }
      },
      base_sso_url: "string",
      categories: [
        "string"
      ],
      default_plan_uuid: "string",
      installation_endpoint: "string",
      is_in_beta: true,
      public_key: "string",
      required_fields: [
        "string"
      ],
      scopes: [
        "string"
      ],
      supported_locales: [
        "string"
      ],
      uninstallation_endpoint: "string",
      updowngrade_installation_endpoint: "string",
      uuid: "string",
      visible_to_clients: true,
      webhooks: {
        endpoint: "string",
        events: [
          "PUBLISH"
        ]
      },
      window_type: "IFRAME",
      wl_app_profile: {
        additionalProp1: {
          app_logo: "string",
          app_long_description: "string",
          app_name: "string",
          app_screenshots: [
            {
              alt_text: "string",
              image_url: "string"
            }
          ],
          app_short_description: "string",
          privacy_note_page: "string",
          public_page: "string",
          terms_of_service_page: "string"
        },
        additionalProp2: {
          app_logo: "string",
          app_long_description: "string",
          app_name: "string",
          app_screenshots: [
            {
              alt_text: "string",
              image_url: "string"
            }
          ],
          app_short_description: "string",
          privacy_note_page: "string",
          public_page: "string",
          terms_of_service_page: "string"
        }
      }
    })
  })
})