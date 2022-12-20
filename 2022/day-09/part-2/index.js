const fs = require("fs");

const inputData = "../input.txt";
const sampleData = "../sample.txt";

const getNextMove = (instruction) => {
  const [direction, spaces] = instruction.split(" ");
  return [direction, parseInt(spaces)];
};

const createNewRow = (length) => new Array(length).fill(".");

const hasNotBeenVisitedByTail = (space) => space !== "#";

const fillRows = (grid, currentRow, method) => {
  let previousRow = currentRow - 1;
  let nextRow = currentRow + 1;

  while (grid[previousRow] !== undefined) {
    grid[previousRow][method](".");
    previousRow--;
  }

  while (grid[nextRow] !== undefined) {
    grid[nextRow][method](".");
    nextRow++;
  }
};

const moveRight = (grid, currentRow, nextCol) => {
  if (grid[currentRow][nextCol] === undefined) {
    grid[currentRow].push(".");
    fillRows(grid, currentRow, "push");
  } else {
    if (hasNotBeenVisitedByTail(grid[currentRow][nextCol])) {
      grid[currentRow][nextCol] = ".";
    }
  }
};

const moveLeft = (grid, currentRow, previousCol) => {
  if (grid[currentRow][previousCol] === undefined) {
    grid[currentRow].unshift(".");
    fillRows(grid, currentRow, "unshift");
  } else {
    if (hasNotBeenVisitedByTail(grid[currentRow][previousCol])) {
      grid[currentRow][previousCol] = ".";
    }
  }
};

const moveUp = (grid, previousRow, currentCol) => {
  if (grid[previousRow] === undefined) {
    const newRow = createNewRow(grid[previousRow + 1].length);
    grid.unshift(newRow);
    grid[0][currentCol] = ".";
  } else if (hasNotBeenVisitedByTail(grid[previousRow][currentCol])) {
    grid[previousRow][currentCol] = ".";
  }
};

const moveDown = (grid, nextRow, currentCol) => {
  if (grid[nextRow] === undefined) {
    const newRow = createNewRow(grid[nextRow - 1].length);
    grid.push(newRow);
  }

  if (hasNotBeenVisitedByTail(grid[nextRow][currentCol])) {
    grid[nextRow][currentCol] = ".";
  }
};

const directionMap = {
  R: moveRight,
  L: moveLeft,
  U: moveUp,
  D: moveDown,
};

// const knotShouldMove = (head, tail, val) => Math.abs(head - tail) === val;
const knotShouldMove = (head, tail) => Math.abs(head - tail) > 1;

const countTailSpaces = (grid) => grid
  .reduce((spaces, row) => [...spaces, ...row], [])
  .filter((space) => space === '#').length;

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split("\n");
  const grid = [
    [0]
  ];

  let headRow = 0;
  let headCol = 0;
  let tailRow = 0;
  let tailCol = 0;

  const knots = [...Array(9).keys()].map((val) => ({
    val: val + 1,
    col: 0,
    row: 0
  }));

  input.forEach((instruction) => {
    const [direction, spaces] = getNextMove(instruction);

    knots.forEach((val) => {
      for (let count = 0; count < spaces; count++) {
        switch (direction) {
          case "R":
            headCol++;
            break;
          case "L":
            headCol--;
            break;
          case "U":
            headRow--;
            break;
          case "D":
            headRow++;
            break;
        }

        directionMap[direction](grid, headRow, headCol);

        if (headCol < 0) {
          headCol = 0;
          // tailCol++;
        }

        if (headRow < 0) {
          headRow = 0;
          // tailRow++;
        }

        const verticalGapIsMoreThanTwo = knotShouldMove(headRow, tailRow);
        const horizontalGapIsMoreThanTwo = knotShouldMove(headCol, tailCol);

        if (verticalGapIsMoreThanTwo) {
          tailCol = headCol;
          if (headRow > tailRow) {
            tailRow = headRow - 1;
          } else {
            tailRow = headRow + 1;
          }
        }

        if (horizontalGapIsMoreThanTwo) {
          tailRow = headRow;
          if (headCol > tailCol) {
            tailCol = headCol - 1;
          } else {
            tailCol = headCol + 1;
          }
        }

        // grid[tailRow][tailCol] = "#";
      }
    });
  });

  const positionsTailVisited = countTailSpaces(grid);

  console.log(grid);
  console.table({
    positionsTailVisited
  });
});
