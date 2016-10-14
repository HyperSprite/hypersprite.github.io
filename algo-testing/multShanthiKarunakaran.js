function multShanthiKarunakaran(times) {
  var total = 0;
  while (times > 1) {
    // console.log(num--);
    times--;
    if (times % 3 === 0 || times % 5 === 0) {
      // console.log("num is" +times);
      total += times;
    }
  }
  return total;
}

module.exports = multShanthiKarunakaran;
