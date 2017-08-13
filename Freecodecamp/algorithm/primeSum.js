/**
 * 
 * @param {number} limit 
 * 质数的范围
 * return 这是一个迭代器函数, 第一次调用的时候生成的是一个迭代器.
 * 就是使用 Array.from 就能转化成数组. 或者使用 next().value 来迭代
 */
function* prime(limit) {
  const collection = [];
  for (let i = 2; i <= limit; ++i) {
    collection.push(i);
  }

  const primes = (function getPrime(array) {
    if (!array.length) return [];
    return [array[0], ...getPrime(array.filter((val) => val % array[0] !== 0))];
  }(collection));

  let idx = 0;
  while (idx < primes.length) {
    yield primes[idx++];
  }
}

function primeSum(num) {
  return Array.from(prime(num)).reduce(($0, $1) => $0 + $1);
}
