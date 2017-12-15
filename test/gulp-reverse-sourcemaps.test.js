import Muter, {captured} from 'muter';
import {expect} from 'chai';
import GulpReverseSourcemaps from '../src/gulp-reverse-sourcemaps';

describe('Testing GulpReverseSourcemaps', function () {
  const muter = Muter(console, 'log'); // eslint-disable-line new-cap

  it(`Class GulpReverseSourcemaps says 'Hello world!'`, captured(muter, function () {
    new GulpReverseSourcemaps();
    expect(muter.getLogs()).to.equal('Hello world!\n');
  }));
});
