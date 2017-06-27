function fibonacci(input) {
  if (input === 0 || input === 1) return input;
  let count = 1;
  function nextFib(nMinus1, nMinus2) {
    count++;
    console.log(count);
    const nNext = nMinus1 + nMinus2;
    if (count === input) {
      return nNext;
    }
    return nextFib(nMinus2, nNext);
  }
  return nextFib(0, 1);
}

module.exports = fibonacci;
