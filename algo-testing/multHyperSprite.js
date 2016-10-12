function arrSum(arr) {
  return arr.reduce((acc, r) => {
    return acc += (r * 1);
  }, 0);
}

function multHyperSprite(num) {
  const tempObj = [...Array(num).keys()].reduce((ac, a) => {
    a % 3 === 0 || a % 5 === 0 ? ac[a] = true : ac;
    return ac;
  }, {});

  return arrSum(Object.keys(tempObj));
}

module.exports = multHyperSprite;
