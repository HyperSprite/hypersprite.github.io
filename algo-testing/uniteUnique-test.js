const should = require('chai').should();
const uniteUniqueHyperSprite = require('./uniteUniqueHyperSprite');
const uniteUniqueShanthiKarunakaran = require('./uniteUniqueShanthiKarunakaran');

describe('uniteUniqueHyperSprite', () => {
  it('should return [1, 3, 2, 5, 4]', () => {
    uniteUniqueHyperSprite([1, 3, 2], [5, 2, 1, 4], [2, 1]).should.deep.include.members([1, 3, 2, 5, 4]);
  });
  it('should return [1, 3, 2, [5], [4]]', () => {
    uniteUniqueHyperSprite([1, 3, 2], [1, [5]], [2, [4]]).should.deep.include.members([1, 3, 2, [5], [4]]);
  });
  it('should return [1, 2, 3, 5]', () => {
    uniteUniqueHyperSprite([1, 2, 3], [5, 2, 1]).should.deep.include.members([1, 2, 3, 5]);
  });
  it('should return [1, 2, 3, 5, 4, 6, 7, 8]', () => {
    uniteUniqueHyperSprite([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]).should.deep.include.members([1, 2, 3, 5, 4, 6, 7, 8]);
  });
});


describe('uniteUniqueShanthiKarunakaran', () => {
  it('should return [1, 3, 2, 5, 4]', () => {
    uniteUniqueShanthiKarunakaran([1, 3, 2], [5, 2, 1, 4], [2, 1]).should.deep.include.members([1, 3, 2, 5, 4]);
  });
  it('should return [1, 3, 2, [5], [4]]', () => {
    uniteUniqueShanthiKarunakaran([1, 3, 2], [1, [5]], [2, [4]]).should.deep.include.members([1, 3, 2, [5], [4]]);
  });
  it('should return [1, 2, 3, 5]', () => {
    uniteUniqueShanthiKarunakaran([1, 2, 3], [5, 2, 1]).should.deep.include.members([1, 2, 3, 5]);
  });
  it('should return [1, 2, 3, 5, 4, 6, 7, 8]', () => {
    uniteUniqueShanthiKarunakaran([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]).should.deep.include.members([1, 2, 3, 5, 4, 6, 7, 8]);
  });
});
