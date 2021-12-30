/*
* Quick tool to create new API resource definitions.
*
* USAGE: yarn new:resource [string, string, string, ...]
*/

const path = require('path');
const fs = require('fs');

const indexDir = path.resolve(__dirname, '../src');
const resourceDir = path.resolve(__dirname, '../src/lib');
const testDir = path.resolve(__dirname, '../tests');

const resourceDirContents = fs.readdirSync(resourceDir);

const newResources = process.argv.slice(2);

if (!newResources.length) {
  console.log('[error:fatal] provide at least one new resource name');
}

const testTemplate = (name) => `/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
*/

import './fakes/api';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as Duda from '../src/index';

const { expect } = chai;

chai.use(chaiAsPromised);

const duda = Duda.New({
  user: process.env.DUDA_API_USER,
  pass: process.env.DUDA_API_PASS,
  logLevel: 'debug',
  logger: console.log,
});

describe('Duda.${name}', function () {
  it('can get ${name}', async function () {
    const get: any = await duda.${name}.get({
      foo: 'bar',
    });
    
    expect(get.foo)
      .to
      .eq('bar');
  });
});
`;

const classTemplate = (name) => `import * as ${name.toLowerCase()} from './types';
import Resource from '../base';
'import { APIEndpoint } from '../APIEndpoint';

class ${name} extends Resource {
  list = APIEndpoint<${name.toLowerCase()}.${name}}, any>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  get = APIEndpoint<${name.toLowerCase()}.${name}}, any>({
    method: 'get',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  create = APIEndpoint<${name.toLowerCase()}.${name}}, any>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  update = APIEndpoint<${name.toLowerCase()}.${name}}, any>({
    method: 'post',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });

  delete = APIEndpoint<collections.Collections, any>({
    method: 'delete',
    path: '/api/sites/multiscreen/{site_name}',
    defaults: {
      host: 'api.duda.co',
    },
  });
}

export default ${name};
export { ${name} };
`;

const indexFile = fs.readFileSync(`${indexDir}/index.ts`);
const indexContent = indexFile.toString();

fs.writeFileSync(`${indexDir}/.index.bck.ts`, indexContent);

Promise.all(newResources.map(function (resource) {
  if (resourceDirContents.includes(resource)) {
    return console.log(`[error] ${resource} already exists`);
  }

  return new Promise((resolve, reject) => {
    const newResourceDir = `${resourceDir}/${resource}`;

    fs.mkdir(newResourceDir, function (err) {
      if (err) {
        console.log(`[error] unable to create resource: resource=${resource} error=${err.toString()}`);
      }

      console.log(`[info] created resource dir: resource=${resource} dir=${newResourceDir}`);

      const firstChar = resource.charAt(0);
      const capitalized = firstChar.toUpperCase() + resource.slice(1);

      fs.writeFileSync(`${resourceDir}/${resource}/${capitalized}.ts`, classTemplate(capitalized));
      console.log(`[info] created ${resourceDir}/${resource}/${capitalized}.ts`);

      const [_, indexReturnObject] = /\/\/\snew:resource:\s*\n*\s*return\s*({[^}]+})/g.exec(indexContent.toString());

      if (indexReturnObject) {
        const toInject = `    ${resource}: new ${capitalized}(config),\n`;

        const toReplace = indexReturnObject.replace(/{\n/, `{\n${toInject}`);

        const newContent = indexContent.replace(indexReturnObject, toReplace)
          .replace('import ', `import ${capitalized} from './lib/${resource}/${capitalized}';\nimport `);

        fs.writeFileSync(`${indexDir}/index.ts`, newContent);

        console.log(`[info] updated ${indexDir}/index.ts with ${capitalized}`);
      }

      fs.writeFileSync(`${resourceDir}/${resource}/types.ts`, `export interface ${capitalized} {\n}\n`);
      console.log(`[info] created ${resourceDir}/${resource}/types.ts`);

      fs.writeFileSync(`${testDir}/test_${resource}.ts`, testTemplate(resource));
      console.log(`[info] created ${testDir}/test_${resource}.ts`);
    });
  });
}));
