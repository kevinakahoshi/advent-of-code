const fs = require('fs');

const inputData = '../input.txt';
const sampleData = '../sample.txt';

const markPermiter = (col, colLength, row, rowLength) => {
  if (col === 0 || row === 0) return true;
  if (col === colLength - 1 || row === rowLength - 1) return true;
  return false;
}

const createValue = (val, row, col, isVisible) => {
  return {
    row,
    col,
    isVisible,
    scenicScore: 0,
    val,
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
      rowVals.push(createValue(val, row, col, isVisible));
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

const compareLeft = (grid, row, col, val) => {
  let count = 0;

  for (let localCol = col - 1; localCol >= 0; localCol--) {
    count++;
    if (grid[row][localCol].val >= val) {
      break;
    }
  }

  return count;
}

const compareRight = (grid, row, col, val) => {
  let count = 0;

  for (let localCol = col + 1; localCol < grid[row].length; localCol++) {
    count++;
    if (grid[row][localCol].val >= val) {
      break;
    }
  }

  return count;
}

const compareUp = (grid, row, col, val) => {
  let count = 0;

  for (let localRow = row - 1; localRow >= 0; localRow--) {
    count++;
    if (grid[localRow][col].val >= val) {
      break;
    }
  }

  return count;
}

const compareDown = (grid, row, col, val) => {
  let count = 0;

  for (let localRow = row + 1; localRow < grid.length; localRow++) {
    count++;

    if (grid[localRow][col].val >= val) {
      break;
    }
  }

  return count;
}

const calculateScenicScore = (grid, tree) => {
  const {
    row,
    col,
    val
  } = tree;

  const leftScore = compareLeft(grid, row, col, val);
  const rightScore = compareRight(grid, row, col, val);
  const upScore = compareUp(grid, row, col, val);
  const downScore = compareDown(grid, row, col, val);

  return [
    leftScore,
    rightScore,
    downScore,
    upScore
  ].reduce((total, score) => total * score, 1);
}

fs.readFile(inputData, (err, data) => {
  const input = data.toString().trim().split('\n');

  const grid = createGrid(input);

  grid.map((row) => {
    return row.map((tree) => {
      const scenicScore = calculateScenicScore(grid, tree);
      tree.scenicScore = scenicScore;
      return scenicScore;
    })
  });

  const allTrees = [...grid].reduce((trees, row) => [...trees, ...row], []);

  console.log(Math.max(...allTrees.map(({
    scenicScore
  }) => scenicScore)));
});
