const fs = require('fs');

const getCount = (arr, colCount, rowCount) => {
  let count = 0;

  for (let column = 0, row = 0; row < arr.length; column += colCount, row += rowCount) {
    if (arr[row][column] === undefined) {
      column = column % arr[row].length;
    }

    if (arr[row][column] === '#') {
      count += 1;
    }
  }

  return count;
}

fs.readFile('../data.txt', (err, data) => {
  if (err) throw err;

  const input = data.toString().split('\n');

  const tracker = {
    0: {
      colCount: 1,
      rowCount: 1
    },
    1: {
      colCount: 3,
      rowCount: 1
    },
    2: {
      colCount: 5,
      rowCount: 1
    },
    3: {
      colCount: 7,
      rowCount: 1
    },
    4: {
      colCount: 1,
      rowCount: 2
    }
  }

  let count = [];

  for (const iteration in tracker) {
    count.push(getCount(input, tracker[iteration].colCount, tracker[iteration].rowCount))
  }

  console.log(count.reduce((curr, accum) => curr * accum, 1));
});
