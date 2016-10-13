
#Testing JavaScript one file at a time

These are my own personal notes on a quick file testing setup. They should work just fine but use them at your peril. 

##Install

> Node and NPM are prerequisites.

```bash
mkdir algo-testing
cd algo-testing
npm init ##and accept all defaults
npm install -g mocha
npm install mocha chai benchmark --save
```

##Mocha
####Create a test file:  ```multHyperSprite-test.js``` 
```js
 
const should = require('chai').should();
const basic = require('./multHyperSprite');

describe('basic', () => {
  it('should return 23 when passed 10', () => {
    basic(10).should.equal(23);
  });
  it('should return 78 when passed 20', () => {
    basic(20).should.equal(78);
  });
  it('should return 2318 when passed 100', () => {
    basic(100).should.equal(2318);
  });
  it('should return 23331668 when passed 10000', () => {
    basic(10000).should.equal(23331668);
  });
  it('should return 486804150 when passed 45678', () => {
    basic(45678).should.equal(486804150);
  });
});

```

####Create a script to be tested: ```multHyperSprite.js```
```js
function arrSum(arr) {
  return arr.reduce((acc, r) => {
    return acc + r * 1;
  }, 0);
}

function multHyperSprite(num) {
  const tempObj = [...Array(num).keys()].reduce((ac, a) => {
    a % 3 === 0 || a % 5 === 0 ? ac[a]=true : ac;
    return ac;
  }, {});

  return arrSum(Object.keys(tempObj));
}

module.exports = multHyperSprite;
```
####Run tests with: ```mocha multHyperSprite.js```

###Mocha Results

```bash
$ mocha multHyperSprite-test.js 

  basic
    ✓ should return 23 when passed 10
    ✓ should return 78 when passed 20
    ✓ should return 2318 when passed 100
    ✓ should return 23331668 when passed 10000
    ✓ should return 486804150 when passed 45678

  5 passing (24ms)
```

##Benchmark

####Create a Benchmark file:  ```multHyperSprite-bm.js```
```js
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var multHyperSprite = require('./multHyperSprite.js');

// add tests
suite
  .add('multHyperSprite Reduce 10000', () => {
    multHyperSprite(10000);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('   Fastest is ' + this.filter('fastest').map('name'));
    console.log('   done!');
  })
    // run async
  .run({ 'async': true });

```
###Run test with ```node multHyperSprite-bm.js```

###Benchmark Results

```bash
$ node multHyperSprite-bm.js 
multHyperSprite Reduce 10000 x 895 ops/sec ±0.70% (90 runs sampled)
multHyperSprite For Loop 10000 x 3,212 ops/sec ±1.77% (89 runs sampled)
   Fastest is multHyperSprite For Loop 10000
   done!

```