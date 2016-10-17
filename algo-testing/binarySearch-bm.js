const Benchmark = require('benchmark');
const binarySearchHyperSprite = require('./binarySearchHyperSprite');

const suite = new Benchmark.Suite;

// add tests
const tmpArr = [];
for (var i = 1; i < 600000; i++) {
  tmpArr.push(i);
}

suite
  .add(`binarySearchHyperSprite        600000, 293246`, () => {
    binarySearchHyperSprite(tmpArr, 293246);
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
