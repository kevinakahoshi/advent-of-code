const data = require('../data');

const findMatchAndMultiply = (arr, targetVal) => {
  const numStore = {};
  for (let index = 0; index < arr.length; index++) {
    const value = arr[index];
    if (!numStore[value]) {
      numStore[targetVal - value] = value;
    } else {
      const results = [value, numStore[value]];
      console.log(results);
      return results;
    }
  }
  return false;
}

console.log(findMatchAndMultiply(data, 2020).reduce((curr, next) => curr * next, 1));
