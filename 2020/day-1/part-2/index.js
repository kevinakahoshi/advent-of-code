const data = require('../data');

const findTripleSumAndMultiply = (arr, targetVal) => {
  for (let outer = 0; outer < arr.length; outer++) {
    for (let middle = outer + 1; middle < arr.length; middle++) {
      for (let inner = middle + 1; inner < arr.length; inner++) {
        const first = arr[outer];
        const second = arr[middle];
        const third = arr[inner];

        if (first + second + third === targetVal) {
          const nums = [first, second, third];
          console.log(nums);
          return nums;
        }
      }
    }
  }

  return false;
}

console.log(findTripleSumAndMultiply(data, 2020).reduce((curr, next) => curr * next, 1));
