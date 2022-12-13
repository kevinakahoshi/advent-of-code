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

const getColAndRow = (key) => {
  return key.split('|').map(Number);
}

const compareHorizontally = (direction) => {

}

const isHorizontallyVisible = (grid, key) => {
  const [col, row] = getColAndRow(key);
  let prevLeft = col;
  let prevRight = col;
  let left = col - 1;
  let right = col + 1;

  while (
    (createKey(left, row) in grid ||
      createKey(right, row) in grid) &&
    !grid[key].isVisible
  ) {
    const leftKey = createKey(left, row);
    const rightKey = createKey(right, row);
    const leftVal = grid[leftKey];
    const rightVal = grid[rightKey];

    if (left >= prevLeft) return false;
    if (right <= prevRight) return false;

    prevLeft = left;
    left--;

    prevRight = right;
    right++;
  }

  return true;
}

const compareVertically = () => {

}

const isVisibleFromOutside = (grid, key) => {
  const [col, row] = getColAndRow(key);

  let colTraverse = col;

  while (colTraverse > 0) {
    const currentKey = createKey(colTraverse, row);
    const previousKey = createKey(colTraverse - 1, row);
    const currentCol = grid[currentKey];
    const previousCol = grid[previousKey];

    if (previousCol.isVisible && previousCol.val < currentCol.val) {
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

// const createGrid = (matrix) => {
//   const grid = {};

//   for (let row = 0; row < matrix.length; row++) {
//     for (let col = 0; col < matrix[row].length; col++) {
//       const key = createKey(col, row);
//       const val = Number(matrix[row][col]);
//       const colLength = matrix.length;
//       const rowLength = matrix[row].length;
//       const isVisible = markPermiter(col, colLength, row, rowLength);
//       grid[key] = createValue(val, isVisible);
//     }
//   }

//   return grid;
// }

const createGrid = (matrix) => {
  const grid = [];

  for (let row = 0; row < matrix.length; row++) {
    const rowVals = [];
    for (let col = 0; col < matrix[row].length; col++) {
      const val = Number(matrix[row][col]);
      const colLength = matrix.length;
      const rowLength = matrix[row].length;
      const isVisible = markPermiter(col, colLength, row, rowLength);
      rowVals.push(createValue(val, isVisible));
    }
    grid.push(rowVals);
  }

  return grid;
}

const viewFromHorizontal = (row) => {
  const [{
    val: startVal
  }] = row;

  let max = row[0].val;

  for (let col = 0; col < row.length; col++) {
    if (row[col].val > max) {
      row[col].isVisible = true;
      max = row[col].val;
    }
  }
}

const viewFromTop = () => {

}

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n');

  const grid = createGrid(input);

  grid.forEach(viewFromHorizontal);
  grid.forEach((row) => viewFromHorizontal([...row].reverse()));

  console.log(grid);

  // const grid = createGrid(input);

  // Object.keys(grid).forEach((key) => isVisibleFromOutside(grid, key));

  // console.log(grid);
});
