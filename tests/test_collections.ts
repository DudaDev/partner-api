/* eslint-disable
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

describe('Duda.collections', function () {
  it('can get collections', async function () {
    const get: any = await duda.collections.get({
      foo: 'bar',
    });

    expect(get.foo)
      .to
      .eq('bar');
  });
});
