const fs = require('fs');
const files = {
  input: '../input.txt',
  sample: '../sample.txt',
}

const FILE = process.argv[2] || 'sample';

fs.readFile(files[FILE], (err, data) => {
  if (err) throw new Error(err);

  const input = data.toString().trim().split('\n');
  const lowPoints = [];
  const columnRowMapping = [];

  for (let row = 0; row < input.length; row++) {
    for (let column = 0; column < input[row].length; column++) {
      const up = row - 1;
      const down = row + 1;
      const left = column - 1;
      const right = column + 1;

      const value = input[row][column];
      const topVal = input[up] && input[up][column];
      const bottomVal = input[down] && input[down][column];
      const leftVal = input[row][left];
      const rightVal = input[row][right];

      const adjacencyList = [
        topVal,
        bottomVal,
        leftVal,
        rightVal
      ].filter((val) => val);

      if (adjacencyList.every((point) => point > value)) {
        lowPoints.push(value);
        columnRowMapping.push({
          row,
          column,
          value
        });
      }
    }
  }

  const findSizeOfBasin = (row, column, count) => {
    if (!input[row] || !input[row][column] || input[row][column] === '9') return count;
    const up = row - 1;
    const down = row + 1;
    const left = column - 1;
    const right = column + 1;

    return findSizeOfBasin(row, left, count + 1);
    // if (input[up]) return findSizeOfBasin(up, column, count + 1);
    // if (input[down]) return findSizeOfBasin(down, column, count + 1);
    // if (input[row][left]) return findSizeOfBasin(row, left, count + 1);
    // if (input[row][right]) return findSizeOfBasin(row, right, count + 1);
  }

  const {
    row,
    column
  } = columnRowMapping[1];
  const total = findSizeOfBasin(row, column, 1);
  console.log(total);
});
