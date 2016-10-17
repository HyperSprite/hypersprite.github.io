const Benchmark = require('benchmark');
const sumPrimesHyperSprite = require('./sumPrimes');

const suite = new Benchmark.Suite;

// add tests
suite
  .add(`sumPrimesHyperSprite        17...`, () => {
    sumPrimesHyperSprite(17);
  })
  .add(`sumPrimesHyperSprite     73156...`, () => {
    sumPrimesHyperSprite(997);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`   Fastest is ${this.filter('fastest').map('name')}`);
    console.log('   done!');
  })
    // run async
  .run({ async: true });
