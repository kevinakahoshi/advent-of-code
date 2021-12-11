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
      }
    }
  }

  const converted = lowPoints.map((lowPoint) => parseInt(lowPoint) + 1);
  console.table(converted.reduce((total, riskLevel) => total + riskLevel, 0));
});
