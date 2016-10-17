function binarySearch(arr, find, min, max, count) {
  count = count + 1 || 1;
  if (count > 99) {
    return 'error';
  }

  min = min || 0;
  max = max || arr.length - 1;
  const mark = min + Math.floor((max - min) / 2);

  if (count === 1) {
    if (find === arr[min]) {
      return min;
    }
    if (find === arr[max]) {
      return max;
    }
  }

  if (find === arr[mark]) {
    return mark;
  }

  if (find < arr[min] || find > arr[max]) {
    return -1;
  }

  if (arr[mark] > find) {
    max = mark - 1;
    return binarySearch(arr, find, min, max, count);
  }
  min = mark + 1;
  return binarySearch(arr, find, min, max, count);
}

// mocha binarySearch-test.js

//   binarySearchHyperSprite
//     ✓ 1 should return 3465
//     ✓ 2 should return 0
//     ✓ 3 should return 5999
//     ✓ 4 should return -1
//     ✓ 5 should return 3465
//     ✓ 6 should return 200
//     ✓ 7 should return 5999
//     ✓ 8 should return -1
//     ✓ 9 should return 0
//     ✓ 10 should return -1
//   10 passing (8ms)


// node binarySearch-bm.js
// binarySearchHyperSprite        6000, 3465 x 3,779,887 ops/sec ±0.91% (84 runs sampled)

// This is the console.log version

function binarySearchTesting(arr, find, min, max, count) {
  count = count + 1 || 1;
  // terminal case
  if (count > 99) {
    return 'error';
  }

  min = min || 0;
  max = max || arr.length - 1;
  const mark = min + Math.floor((max - min) / 2);
  if (count < 20 || count > 98) console.log(` ---- count:${count}, min:${min}, mark:${mark}, max:${max}`);

  if (count === 1) {
    if (find === arr[min]) {
      console.log(`return min:${min} in ${count} passes`);
      return min;
    }
    if (find === arr[max]) {
      console.log(`return max:${max} in ${count} passes`);
      return max;
    }
  }

  if (find === arr[mark]) {
    console.log(`return indexOf:${mark} found at:${arr[mark]} in ${count} passes`);
    return mark;
  }

  if (find < arr[min] || find > arr[max]) {
    console.log(`returned -1 in ${count} passes`);
    return -1;
  }

  if (arr[mark] > find) {
    max = mark - 1;
    return binarySearch(arr, find, min, max, count);
  }
  min = mark + 1;
  return binarySearch(arr, find, min, max, count);
}

// const tmpArr = [];
// for (let i = 0; i < 6000; i++) {
//   tmpArr.push(i);
// }

// binarySearch(tmpArr, 3465);

module.exports = binarySearch;
