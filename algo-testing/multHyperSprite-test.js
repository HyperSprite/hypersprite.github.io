const should = require('chai').should();
const multHyperSprite = require('./multHyperSprite');
const multHyperSprite2 = require('./multHyperSprite2');
const multHyperSprite3 = require('./multHyperSprite3');
const multShanthiKarunakaran = require('./multShanthiKarunakaran');


describe('multHyperSprite', () => {
  it('should return 23 when passed 10', () => {
    multHyperSprite(10).should.equal(23);
  });
  it('should return 78 when passed 20', () => {
    multHyperSprite(20).should.equal(78);
  });
  it('should return 2318 when passed 100', () => {
    multHyperSprite(100).should.equal(2318);
  });
  it('should return 23331668 when passed 10000', () => {
    multHyperSprite(10000).should.equal(23331668);
  });
  it('should return 486804150 when passed 45678', () => {
    multHyperSprite(45678).should.equal(486804150);
  });
});


describe('multHyperSprite2', () => {
  it('should return 23 when passed 10', () => {
    multHyperSprite2(10).should.equal(23);
  });
  it('should return 78 when passed 20', () => {
    multHyperSprite2(20).should.equal(78);
  });
  it('should return 2318 when passed 100', () => {
    multHyperSprite2(100).should.equal(2318);
  });
  it('should return 23331668 when passed 10000', () => {
    multHyperSprite2(10000).should.equal(23331668);
  });
  it('should return 486804150 when passed 45678', () => {
    multHyperSprite2(45678).should.equal(486804150);
  });
});

describe('multHyperSprite3', () => {
  it('should return 23 when passed 10', () => {
    multHyperSprite3(10).should.equal(23);
  });
  it('should return 78 when passed 20', () => {
    multHyperSprite3(20).should.equal(78);
  });
  it('should return 2318 when passed 100', () => {
    multHyperSprite3(100).should.equal(2318);
  });
  it('should return 23331668 when passed 10000', () => {
    multHyperSprite3(10000).should.equal(23331668);
  });
  it('should return 486804150 when passed 45678', () => {
    multHyperSprite3(45678).should.equal(486804150);
  });
});

// FCC Buddy's Script
describe('multShanthiKarunakaran', () => {
  it('should return 23 when passed 10', () => {
    multShanthiKarunakaran(10).should.equal(23);
  });
  it('should return 78 when passed 20', () => {
    multShanthiKarunakaran(20).should.equal(78);
  });
  it('should return 2318 when passed 100', () => {
    multShanthiKarunakaran(100).should.equal(2318);
  });
  it('should return 23331668 when passed 10000', () => {
    multShanthiKarunakaran(10000).should.equal(23331668);
  });
  it('should return 486804150 when passed 45678', () => {
    multShanthiKarunakaran(45678).should.equal(486804150);
  });
});
