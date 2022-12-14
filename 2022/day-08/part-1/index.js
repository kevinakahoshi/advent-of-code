const fs = require('fs');

const inputData = '../input.txt';
const sampleData = '../sample.txt';

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
  let max = row[0].val;

  for (let col = 0; col < row.length; col++) {
    if (row[col].val > max) {
      row[col].isVisible = true;
      max = row[col].val;
    }
  }
}

const viewFromVertical = (grid) => {
  for (let col = 0; col < grid[0].length; col++) {
    let max = grid[0][col].val;
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col].val > max) {
        grid[row][col].isVisible = true;
        max = grid[row][col].val;
      }
    }
  }
}

fs.readFile(inputData, (err, data) => {
  const input = data.toString().trim().split('\n');

  const grid = createGrid(input);

  grid.forEach(viewFromHorizontal);
  grid.forEach((row) => viewFromHorizontal([...row].reverse()));
  viewFromVertical(grid);
  viewFromVertical([...grid].reverse());

  const totalVisible = grid.map((row) =>
    row.filter(({
      isVisible
    }) => isVisible).length
  ).reduce((total, rowTotal) => total + rowTotal);

  console.log(totalVisible);
});
