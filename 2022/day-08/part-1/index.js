const fs = require('fs');

const inputData = '../input.txt';
const sampleData = '../sample.txt';

/*

Create grid object
- Keys are [column]:[row]
- Values is boolean based on whether value is higher than permiter or surrounding nodes
  - If yes, stop checking
  - If no, mark no and keep checking
*/

const createKey = (column, row) => `${column}|${row}`;

const markPermiter = (col, colLength, row, rowLength) => {
  if (col === 0 || row === 0) return true;
  if (col === colLength - 1 || row === rowLength - 1) return true;
  return false;
}

const createValue = (val, isVisible) => {
  return {
    isVisible,
    val
  }
}

const isVisibleFromOutside = (grid, key) => {
  const [col, row] = key.split('|').map(Number);

  let colTraverse = col;

  while (colTraverse > 0) {
    const currentKey = createKey(colTraverse, row);
    const previousKey = createKey(colTraverse - 1, row);
    const currentCol = grid[currentKey];
    const previousCol = grid[previousKey];

    if (currentCol.val > previousCol.val && !currentCol.isVisible) {
      currentCol.isVisible = true;
    }

    colTraverse--;
  }

  let rowTraverse = row;

  while (rowTraverse > 0) {
    const currentKey = createKey(col, rowTraverse);
    const previousKey = createKey(col, rowTraverse - 1);
    const currentCol = grid[currentKey];
    const previousCol = grid[previousKey];

    if (currentCol.val > previousCol.val && !currentCol.isVisible) {
      currentCol.isVisible = true;
    }

    rowTraverse--;
  }
}

const createGrid = (matrix) => {
  const grid = {};

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const key = createKey(col, row);
      const val = Number(matrix[row][col]);
      const colLength = matrix.length;
      const rowLength = matrix[row].length;
      const isVisible = markPermiter(col, colLength, row, rowLength);
      grid[key] = createValue(val, isVisible);
    }
  }

  return grid;
}

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n');

  const grid = createGrid(input);

  Object.keys(grid).forEach((key) => isVisibleFromOutside(grid, key));

  console.log(grid);
});
