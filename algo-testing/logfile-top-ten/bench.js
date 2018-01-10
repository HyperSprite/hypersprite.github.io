const Benchmark = require('benchmark');
const logParse = require('./index');
const newLogs = require('./logs');

const suite = new Benchmark.Suite;

const result = [
  { ip: '9.4.8.24', count: 24 },
  { ip: '72.15.99.23', count: 23 },
  { ip: '82.37.88.22', count: 22 },
  { ip: '75.1.9.21', count: 21 },
  { ip: '11.5.1.20', count: 20 },
  { ip: '191.14.18.13', count: 13 },
  { ip: '29.115.9.13', count: 13 },
  { ip: '48.87.84.12', count: 12 },
  { ip: '90.80.70.10', count: 10 },
  { ip: '91.34.188.9', count: 9 },
];

suite
  .add('TopTen 208 lines', () => {
    logParse(newLogs);
  })
  .add('TopTen 416 lines', () => {
    logParse([...newLogs, ...newLogs]);
  })
  .add('TopTen 624 lines', () => {
    logParse([...newLogs, ...newLogs, ...newLogs]);
  })
  .add('TopTen 832 lines', () => {
    logParse([...newLogs, ...newLogs, ...newLogs, ...newLogs]);
  })
  .add('TopTen 1040 lines', () => {
    logParse([...newLogs, ...newLogs, ...newLogs, ...newLogs, ...newLogs]);
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
