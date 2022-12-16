const fs = require('fs');

const inputData = '../input.txt';
const sampleData = '../sample.txt';

const getNextMove = (instruction) => {
  const [direction, spaces] = instruction.split(' ');
  return [direction, parseInt(spaces)];
}

const createNewRow = (length) => new Array(length).fill('.');

const fillRows = (grid, currentRow, method) => {
  let previousRow = currentRow - 1;
  let nextRow = currentRow + 1;

  while (grid[previousRow] !== undefined) {
    grid[previousRow][method]('.');
    previousRow--;
  }

  while (grid[nextRow] !== undefined) {
    grid[nextRow][method]('.');
    nextRow++;
  }
}

const moveRight = (grid, currentRow, nextCol) => {
  if (grid[currentRow][nextCol] === undefined) {
    grid[currentRow].push('H');
    fillRows(grid, currentRow, 'push');
  } else {
    grid[currentRow][nextCol] = 'H';
  }
}

const moveLeft = (grid, currentRow, previousCol) => {
  if (grid[currentRow][previousCol] === undefined) {
    grid[currentRow].unshift('H');
    fillRows(grid, currentRow, 'unshift');
  } else {
    grid[currentRow][previousCol] = 'H';
  }
}

const moveUp = (grid, previousRow, currentCol) => {
  if (grid[previousRow] === undefined) {
    const newRow = createNewRow(grid[previousRow + 1].length);
    grid.unshift(newRow);
    previousRow = 0;
  }

  grid[previousRow][currentCol] = 'H';
}

const moveDown = (grid, nextRow, currentCol) => {
  if (grid[nextRow] === undefined) {
    const newRow = createNewRow(grid[nextRow - 1].length)
    grid.push(newRow);
  }

  grid[nextRow][currentCol] = 'H';
}

const checkIndex = (index) => index < 0 ? 0 : index;

const directionMap = {
  R: moveRight,
  L: moveLeft,
  U: moveUp,
  D: moveDown
}

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n');
  const grid = [
    ['S']
  ];

  let currentRow = 0;
  let currentCol = 0;

  input.forEach((instruction) => {
    const [direction, spaces] = getNextMove(instruction);

    for (let count = 0; count < spaces; count++) {
      switch (direction) {
        case 'R':
          currentCol++;
          break;
        case 'L':
          currentCol--;
          break;
        case 'U':
          currentRow--;
          break;
        case 'D':
          currentRow++;
          break;
      }

      directionMap[direction](grid, currentRow, currentCol);

      if (currentCol < 0) {
        currentCol = 0;
      }

      if (currentRow < 0) {
        currentRow = 0;
      }
    }
  });

  console.log(grid);
});
