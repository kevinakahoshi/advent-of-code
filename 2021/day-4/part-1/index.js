const fs = require('fs');

const chunk = (list) => {
  const output = [];
  let current = [];
  list.forEach((row, index) => {
    current
      .push(row.split(' ')
        .filter((val) => val.length)
        .map((numString) => parseInt(numString)));
    if ((index + 1) % 5 === 0) {
      output.push(current);
      current = [];
    }
  });
  return output;
}

const listIsWinner = (list, winningValues) =>
  list.every((val) => winningValues.includes(val));

const checkHorizontal = (matrix, winningValues) => {
  for (let row = 0; row < matrix.length; row++) {
    if (listIsWinner(matrix[row], winningValues)) return true;
  }
  return false;
}

const checkVertical = (matrix, winningValues) => {
  for (let column = 0; column < matrix.length; column++) {
    const col = [];
    for (let row = 0; row < matrix.length; row++) {
      col.push(matrix[row][column]);
    }
    if (listIsWinner(col, winningValues)) return true;
  }
  return false;
}

const checkDiagonal = (matrix, winningValues) => {
  let column = 0;
  let row = 0;

  const topLeftToBottomRight = [];

  while (column < matrix.length) {
    topLeftToBottomRight.push(matrix[column][row]);
    column++;
    row++;
  }

  if (listIsWinner(topLeftToBottomRight, winningValues))
    return true;

  column = 0;
  row = matrix.length - 1;

  const bottomLeftToTopRight = [];

  while (column < matrix.length) {
    bottomLeftToTopRight.push(matrix[column][row]);
    column++;
    row--;
  }

  if (listIsWinner(bottomLeftToTopRight, winningValues))
    return true;
  return false;
}

const isBingoWinner = (matrix, winningValues) => {
  const winningRow = checkHorizontal(matrix, winningValues);
  if (winningRow) return true;

  const winningColumn = checkVertical(matrix, winningValues);
  if (winningColumn) return true;

  const winningDiagonal = checkDiagonal(matrix, winningValues);
  if (winningDiagonal) return true;

  return false;
}

const tallySum = (values) =>
  values.reduce((total, number) => total + number, 0);

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString().split('\n');
  const bingoDrawValues =
    input[0].split(',').map((numString) => parseInt(numString));
  const allRows = input.slice(2).filter((row) => row.length);
  const matrices = chunk(allRows);
  const winningValues = [];

  while (bingoDrawValues.length) {
    const draw = bingoDrawValues.shift();
    winningValues.push(draw);

    for (let index = 0; index < matrices.length; index++) {
      const isWinningMatrix = isBingoWinner(matrices[index], winningValues);

      if (isWinningMatrix) {
        const winningNumber = winningValues[winningValues.length - 1];
        const filteredMatrixValues =
          matrices[index]
          .reduce((values, row) => [...values, ...row], [])
          .filter((val) =>
            !winningValues.includes(val));
        const filteredMatrixValuesSum = tallySum(filteredMatrixValues);
        return console.log(filteredMatrixValuesSum * winningNumber);
      }
    }
  }
});
