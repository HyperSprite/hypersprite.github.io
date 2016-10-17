function uniteUniqueShanthiKarunakaran(arr) {
//   var arr = [];
//   var i = 0;
//   var result = [];
//   var uniqueArray = [];

//   while(arguments[i]) {
//     arr= arr.concat(arguments[i]);
//     i++;
//   }

//   // elem : 1, index : 0
//   // elem : 3 , index : 1
//   // elem : 2 , index : 2
//   // filter : callback function is called for each element in the array
//   uniqueArray = arr.filter(function(elem, index, arr) {
//   // console.log("indexOf" + " " +elem + "is" + " " +arr.indexOf(elem) + "index is" + " " +index);
//   // no duplicates , then push to the result array
//     if (arr.indexOf(elem) === index) {
//       result.push(arr[index]);
//     }
//   });
//   return result;
// }
 var arr = [],
      i = 0,
      result = [];

  while(arguments[i]) {
    arr= arr.concat(arguments[i]);
    i++;
  }

//elem : 1, index : 0
//elem : 3 , index : 1
//elem : 2 , index : 2
//filter : callback function is called for each element in the array
var uniqueArray = arr.filter(function(elem, index, arr) {
      console.log("indexOf" + " " +elem + "is" + " " +arr.indexOf(elem) + "index is" + " " +index);

       //no duplicates , then push to the result array
       if(arr.indexOf(elem) === index) {
          result.push(arr[index]);
       }
    }
);

 return result;
}

module.exports = uniteUniqueShanthiKarunakaran;
