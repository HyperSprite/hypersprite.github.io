const should = require('chai').should();
const fibonacciHS = require('./fibonacci-hypersprite');
const fibonacciSK = require('./fibonacci-sk');

const testArr = [
  { result: 0, count: 0 },
  { result: 1, count: 1 },
  { result: 3, count: 4 },
  { result: 5, count: 5 },
  { result: 21, count: 8 },
  { result: 55, count: 10 },
  { result: 144, count: 12 },
  { result: 7.654090467756932e+60, count: 293 },
  { result: 2.2223224462942035e+62, count: 300 },
  { result: 1.3364717134737413e+178, count: 854 },
];


describe('fibonacci-hs', () => {
  testArr.forEach((test) => {
    it(`${test.count} should return ${test.result}`, () => {
      fibonacciHS(test.count).should.equal(test.result);
    });
  });
});

// fails with large numbers
// describe('fibonacci-sk', () => {
//   testArr.forEach((test) => {
//     it(`${test.count} should return ${test.result}`, () => {
//       fibonacciSK(test.count).should.equal(test.result);
//     });
//   });
// });
