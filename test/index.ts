import {expect} from 'chai';

import MiddlewareManager = require('../index');

describe('middleware-manager', () => {
  it('works', () => {
    const mw = new MiddlewareManager;
    mw.register('test', (req, res) => {
      return 'response';
    });

    expect(mw.get('test')(null, null)).to.equal('response');
  });
});
