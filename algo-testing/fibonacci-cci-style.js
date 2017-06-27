function fibonacci(input) {
  const fibonacciFrist = (n) => {
    return fibonacciSecond(n, [n + 1]);
  };
  const fibonacciSecond = (i, memo) => {
    if (i === 0 || i === 1) return i;
    if (memo[i] !== 0) {
      memo[i] = fibonacciSecond(i - 1, memo) + fibonacciSecond(i - 2, memo);
    }
    return memo[i];
  };
  return fibonacciFrist(input);
}

module.exports = fibonacci;
