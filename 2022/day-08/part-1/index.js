const fs = require('fs');

const inptut = '../input.txt';
const sample = '../sample.txt';

/*

Create grid object
- Keys are [column]:[row]
- Values is boolean based on whether value is higher than permiter or surrounding nodes
  - If yes, stop checking
  - If no, mark no and keep checking
*/

const createKey = (column, row) => `${column}|${row}`;

const createValue = (val) => {
  return {
    isVisible: null,
    val
  }
}

const isVisibleFromOutside = (grid, key) => {
  const [col, row] = key.split('|');



}

const createGrid = (matrix) => {
  const grid = {};

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const key = createKey(col, row);
      const val = matrix[row][col];
      grid[key] = createValue(val);
    }
  }

  return grid;
}

fs.readFile(sample, (err, data) => {
  const input = data.toString().trim().split('\n');

  const grid = createGrid(input);

  console.log(grid);
});
