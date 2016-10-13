var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

function arrSum1(arr) {
  return arr.reduce((acc, r) => {
    return acc += (r * 1);
  }, 0);
}

function multHyperSprite1(num) {
  const tempObj = [...Array(num).keys()].reduce((ac, a) => {
    a % 3 === 0 || a % 5 === 0 ? ac[a] = true : ac;
    return ac;
  }, {});

  return arrSum1(Object.keys(tempObj));
}


function arrSum2(arr) {
  var result = 0;
  for (let i = 0, l = arr.length; i < l; i++) {
    result += arr[i] * 1;
  }
  return result;
}

function multHyperSprite2(num) {
  var tempObj = {};

  for (var i = 0; i < num; ++i){
    if (i % 3 === 0 || i % 5 === 0){
      tempObj[i] = true;
    }
  }
  return arrSum2(Object.keys(tempObj));
}

// add tests
suite
  .add('multHyperSprite Reduce 10000', () => {
    multHyperSprite1(10000)
  })
  .add('multHyperSprite For Loop 10000', () => {
    multHyperSprite2(10000)
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
