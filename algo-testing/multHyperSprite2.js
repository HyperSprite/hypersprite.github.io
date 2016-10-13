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

module.exports = multHyperSprite2;
