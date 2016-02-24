import {expect} from 'chai';

import MiddlewareManager = require('../index');

describe('middleware-manager', () => {
  it('works', () => {
    const mw = new MiddlewareManager;
    mw.register('test', (req, res) => {
      return 'response';
    });

    expect(mw.get('test')(null, null)).to.equal('response');

    mw.register('test2', () => () => 'response2');
    expect(mw.get('test2', [])(null, null)).to.equal('response2');
  });
});
