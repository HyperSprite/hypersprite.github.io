function arrSum2(arr) {
  var result = 0;
  for (let i = 0, l = arr.length; i < l; ++i) {
    result += arr[i] * 1;
  }
  return result;
}

function multOf(num, mult, mObj) {
  for (var j = mult; j < num; j += mult) {
    mObj[j] = true;
  }
  return mObj;
}

function multHyperSprite3(num) {
  var tempObj = {};
  var n = [3, 5];

  for (var i = 0, l = n.length; i < l; ++i){
    tempObj = multOf(num, n[i], tempObj);
  }
  return arrSum2(Object.keys(tempObj));
}

module.exports = multHyperSprite3;

//multHyperSprite3(10); //Output: 23
//multX(20); //Output: 78
//multX(100); //Output: 2318
//multX(10000); //Output: 23331668
//multiHyperSprite(45678); //Output: 486804150
