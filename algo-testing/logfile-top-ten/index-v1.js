class TopTen {
  constructor() {
    this.data = [];
  }
  add(ipCount) {
    /**
    * Is ipCount.count less lowest value in data?
    * If true, return early
    */
    if (this.data[9] && this.data[9].count > ipCount.count) {
      return;
    }
    /**
    * Get indexOf ipCount.ip in data
    */
    const inData = this.data.map(d => d.ip).indexOf(ipCount.ip);
    /**
    * data contains ip match, update ipCount;
    */
    if (inData !== -1) {
      this.data[inData] = ipCount;
    /**
    * data has less than 10 entries and none match ipCount.ip
    */
    } else if (this.data.length < 11) {
      this.data.push(ipCount);
    }
    /**
    * Sort data array.
    */
    this.data = this.data.sort((a, b) => b.count - a.count).slice(0, 10);
  }
  get() {
    return this.data;
  }
}

class LogDict {
  constructor() {
    this.ipCount = {};
  }
  add(ip) {
    this.ipCount[ip] = this.ipCount[ip] ? this.ipCount[ip] += 1 : 1;
    return { ip, count: this.ipCount[ip] };
  }
}

module.exports = function logParse(logs) {
  const logDict = new LogDict();
  const topTen = new TopTen();
  while (logs.length) {
    /**
    * Parse log lines and extract IP addresses
    */
    const log = logs.shift();
    let ip = log.slice(log.indexOf('[client ') + 8);
    ip = ip.slice(0, ip.indexOf(']'));
    /**
    * Add IPs to logDict.data
    */
    const ipCount = logDict.add(ip);
    /**
    * Add or reject IP for TopTen.data
    */
    topTen.add(ipCount);
  }
  return topTen.get();
};
