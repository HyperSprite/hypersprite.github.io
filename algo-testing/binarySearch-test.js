const should = require('chai').should();
const binarySearchHyperSprite = require('./binarySearchHyperSprite');

const tmpArr = [];
for (var j = 0; j < 6000; j++) {
  tmpArr.push(j);
}

const tmpArr2 = [];
for (var i = 0; i < 6000; i++) {
  tmpArr2.push(i - 200);
}

describe('binarySearchHyperSprite', () => {
  it('1 should return 3465', () => {
    binarySearchHyperSprite(tmpArr, 3465).should.equal(3465);
  });
  it('2 should return 0', () => {
    binarySearchHyperSprite(tmpArr, 0).should.equal(0);
  });
  it('3 should return 5999', () => {
    binarySearchHyperSprite(tmpArr, 5999).should.equal(5999);
  });
  it('4 should return -1', () => {
    binarySearchHyperSprite(tmpArr, 6000).should.equal(-1);
  });
  it('5 should return 3465', () => {
    binarySearchHyperSprite(tmpArr2, -3).should.equal(197);
  });
  it('6 should return 200', () => {
    binarySearchHyperSprite(tmpArr2, 0).should.equal(200);
  });
  it('7 should return 5999', () => {
    binarySearchHyperSprite(tmpArr2, 5799).should.equal(5999);
  });
  it('8 should return -1', () => {
    binarySearchHyperSprite(tmpArr2, 5800).should.equal(-1);
  });
  it('9 should return 0', () => {
    binarySearchHyperSprite(tmpArr2, -200).should.equal(0);
  });
  it('10 should return -1', () => {
    binarySearchHyperSprite(tmpArr2, -201).should.equal(-1);
  });
});
