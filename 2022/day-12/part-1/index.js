const fs = require("fs");

const inputData = "../input.txt";
const sampleData = "../sample.txt";

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const generateCoordinates = (row, col) => ({
  row,
  col
});

const findPositionOfCharacters = (matrix) => {
  const coordinates = {
    start: null,
    end: null
  }

  matrix.forEach((row, rowIndex) => {
    row.split('').forEach((col, colIndex) => {
      const isStart = col === 'S';
      const key = isStart ? 'start' : 'end';

      if (col === 'S' || col === 'E') {
        coordinates[key] = generateCoordinates(rowIndex, colIndex);
      }
    });
  });

  return coordinates;
}

const explore = (row, col, matrix, letterIndex) => {
  if (matrix[row] === undefined || matrix[row][col] === undefined) return {};

  const up = row - 1;
  const down = row + 1;
  const left = col - 1;
  const right = col + 1;

  return {
    row,
    col,
    letterIndex
  };
}

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n');
  const {
    start,
    end
  } = findPositionOfCharacters(input);

  let startingLetterIndex = 0;

  console.table({
    start,
    end
  });
});
