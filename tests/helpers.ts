import * as Duda from '../src/index';

require('dotenv')
  .config();

const duda = Duda.New({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  host: Duda.envs.sandbox,
});

let testSiteName: string | null;

export async function GetTestSite() {
  if (!testSiteName) {
    testSiteName = await duda.sites.create({ template_id: '1030623' })
      .then((resp) => resp.site_name);
  }
  return testSiteName;
}

export async function DeleteTestSite() {
  if (testSiteName) {
    await duda.sites.delete({ site_name: testSiteName });
  }
  testSiteName = null;
}
