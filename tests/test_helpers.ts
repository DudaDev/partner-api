/* eslint-disable
no-unused-expressions,
no-unused-vars,
prefer-arrow-callback,
*/

import './fakes/api';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as helpers from '../src/lib/helpers';

const { expect } = chai;

chai.use(chaiAsPromised);

describe('Duda.apps', function () {
  it('copyWithoutKey(): throws an error when non-object is passed', async function () {
    try {
      helpers.copyWithoutKeys([], ['foo', 'bar']);
    } catch (e) {
      expect(e).to.not.be.null;
    }
  });
});
