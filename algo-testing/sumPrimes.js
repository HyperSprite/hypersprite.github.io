function primal(n) {
  return n > 0 && !(Array(n + 1).join(1).match(/^1?$|^(11+?)\1+$/));
}

function sumPrimes(num) {
  return Array.apply(null, { length: num + 1 }).map(Number.call, Number).filter(i => {
    return (primal(i));
  }).reduce((acc, t) => {
    return acc += t;
  }, 0);
}

module.exports = sumPrimes;

// sumPrimes(10);// should return 17.
// sumPrimes(977);// should return 73156.

// mocha sumPrimes-test.js


//   sumPrimesHyperSprite
//     ✓ 1 should return 17
//     ✓ 2 should return 73156

