/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
*/

import './fakes/api';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import log from '../src/lib/log';

const { expect } = chai;

chai.use(chaiAsPromised);

describe('Duda.apps', function () {
  it('can throw an error', async function () {
    try {
      log.throw('oops', { foo: 'bar' });
    } catch (e) {
      expect(e).to.not.be.null;
    }
  });
});
