const should = require('chai').should();
const logParse = require('./index');

const newLogs = require('./logs');

const result1 = [
  { key: '9.4.8.24', count: 24 },
  { key: '72.15.99.23', count: 23 },
  { key: '82.37.88.22', count: 22 },
  { key: '75.1.9.21', count: 21 },
  { key: '11.5.1.20', count: 20 },
  { key: '191.14.18.13', count: 13 },
  { key: '29.115.9.13', count: 13 },
  { key: '48.87.84.12', count: 12 },
  { key: '90.80.70.10', count: 10 },
  { key: '91.34.188.9', count: 9 },
];

const result2 = [
  { key: '9.4.8.24', count: 48 },
  { key: '72.15.99.23', count: 46 },
  { key: '82.37.88.22', count: 44 },
  { key: '75.1.9.21', count: 42 },
  { key: '11.5.1.20', count: 40 },
  { key: '191.14.18.13', count: 26 },
  { key: '29.115.9.13', count: 26 },
  { key: '48.87.84.12', count: 24 },
  { key: '90.80.70.10', count: 20 },
  { key: '91.34.188.9', count: 18 },
];

describe('logParse TopTen 1', () => {
  it('returns an array matching result1', () => {
    logParse(newLogs).should.to.have.deep.members(result1);
  });
});

describe('logParse TopTen 2', () => {
  it('returns an array matching result2', () => {
    logParse([...newLogs, ...newLogs]).should.to.have.deep.members(result2);
  });
});
