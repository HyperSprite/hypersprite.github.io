const Benchmark = require('benchmark');
const uniteUniqueHyperSprite = require('./uniteUniqueHyperSprite');
const uniteUniqueShanthiKarunakaran = require('./uniteUniqueShanthiKarunakaran');

const suite = new Benchmark.Suite;

// add tests
suite
  .add(`uniteUniqueHyperSprite        [1, 2, 3]...`, () => {
    uniteUniqueHyperSprite([1, 2, 3],[5, 2, 1, 4],[2, 1],[6, 7, 8]);
  })
  .add(`uniteUniqueShanthiKarunakaran [1, 2, 3]...`, () => {
    uniteUniqueShanthiKarunakaran([1, 2, 3],[5, 2, 1, 4],[2, 1],[6, 7, 8]);
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
