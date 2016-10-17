function addToArr(store, manyArr) {
  manyArr.forEach(arr => {
    arr.forEach(item => {
      if (store.indexOf(item) === -1) {
        return store.push(item);
      }
      return store;
    });
  });
  return store;
}

// es6 - use rest '...args', args will automatically be an array
function uniteUniqueHyperSprite(...args) {
  // es6 - first argument goes in resArr, remaining items in rest var
  const [firstArg, ...rest] = args;
  return addToArr(firstArg, rest);
}

module.exports = uniteUniqueHyperSprite;
