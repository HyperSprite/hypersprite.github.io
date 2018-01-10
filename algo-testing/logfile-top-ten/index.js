/**
* Build a TopTen tracker
*
* 1) Is keyCount.count less lowest value in data?
*    If true, return early
* 2) Get indexOf keyCount.key in data
* 3) Data contains key match, update keyCount;
* 4) Data has less than 10 entries and none match keyCount.key
* 5) Sort data array.
*/

class TopTen {
  constructor() {
    this.data = [];
  }
  add(keyCount) {
    if (this.data[9] && this.data[9].count > keyCount.count) {
      return;
    }
    const inData = this.data.map(d => d.key).indexOf(keyCount.key);

    if (inData !== -1) {
      this.data[inData] = keyCount;
    } else if (this.data.length < 11) {
      this.data.push(keyCount);
    }
    this.data = this.data.sort((a, b) => b.count - a.count).slice(0, 10);
  }
  get() {
    return this.data;
  }
}

/**
* Build a generic dictionary of key: count
*/
class KeyDict {
  constructor() {
    this.keyCounts = {};
  }
  add(key) {
    this.keyCounts[key] = this.keyCounts[key] ? this.keyCounts[key] += 1 : 1;
    return { key, count: this.keyCounts[key] };
  }
}

/**
* Parse Log array
*
* Parse log lines and extract IP addresses.
* Add IPs to keyDict.data
* Add or reject IP for TopTen.data
* return TopTen as array of objects.
*/
module.exports = function logParse(logs) {
  const keyDict = new KeyDict();
  const topTen = new TopTen();
  while (logs.length) {
    const log = logs.shift();
    let ip = log.slice(log.indexOf('[client ') + 8);
    ip = ip.slice(0, ip.indexOf(']'));
    const ipCount = keyDict.add(ip);
    topTen.add(ipCount);
  }
  // console.log(topTen.get());
  return topTen.get();
};
