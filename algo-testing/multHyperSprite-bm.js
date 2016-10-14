const Benchmark = require('benchmark');
const multHyperSprite1 = require('./multHyperSprite');
const multHyperSprite2 = require('./multHyperSprite2');
const multHyperSprite3 = require('./multHyperSprite3');
const multShanthiKarunakaran = require('./multShanthiKarunakaran');

const suite = new Benchmark.Suite;
const number = 10000;

// add tests
suite
  .add(`multShanthiKarunakaran v.simple ${number}`, () => {
    multShanthiKarunakaran(number);
  })
  .add(`multHyperSprite ${number}`, () => {
    multHyperSprite1(number);
  })
  .add(`multHyperSprite2 ${number}`, () => {
    multHyperSprite2(number);
  })
  .add(`multHyperSprite3 ${number}`, () => {
    multHyperSprite3(number);
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
