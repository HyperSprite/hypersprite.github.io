const should = require('chai').should();
const sumPrimesHyperSprite = require('./sumPrimes');

describe('sumPrimesHyperSprite', () => {
  it('1 should return 17', () => {
    sumPrimesHyperSprite(10).should.equal(17);
  });
  it('2 should return 73156', () => {
    sumPrimesHyperSprite(977).should.equal(73156);
  });
});
