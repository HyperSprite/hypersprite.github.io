var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var multHyperSprite1 = require('./multHyperSprite.js');
var multHyperSprite2 = require('./multHyperSprite2.js');


// add tests
suite
  .add('multHyperSprite Reduce 10000', () => {
    multHyperSprite1(10000);
  })
  .add('multHyperSprite For Loop 10000', () => {
    multHyperSprite2(10000);
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
