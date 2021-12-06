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
    if (listIsWinner(matrix[row], winningValues)) return matrix[row];
  }
  return [];
}

const checkVertical = (matrix, winningValues) => {
  for (let column = 0; column < matrix.length; column++) {
    const col = [];
    for (let row = 0; row < matrix.length; row++) {
      col.push(matrix[row][column]);
    }
    if (listIsWinner(col, winningValues)) return col;
  }
  return [];
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
    return topLeftToBottomRight;

  column = 0;
  row = matrix.length - 1;

  const bottomLeftToTopRight = [];

  while (column < matrix.length) {
    bottomLeftToTopRight.push(matrix[column][row]);
    column++;
    row--;
  }

  if (listIsWinner(bottomLeftToTopRight, winningValues))
    return bottomLeftToTopRight;
  return [];
}

const isBingoWinner = (matrix, winningValues) => {
  const winningRow = checkHorizontal(matrix, winningValues);
  if (winningRow.length) return winningRow;

  const winningColumn = checkVertical(matrix, winningValues);
  if (winningColumn.length) return winningColumn;

  const winningDiagonal = checkDiagonal(matrix, winningValues);
  if (winningDiagonal.length) return winningDiagonal;

  return [];
}

const tallySum = (values) =>
  values.reduce((total, number) => total + number, 0);

const getUnamrkedNums = (matrix, winningValues) =>
  matrix
  .reduce((values, row) => [...values, ...row], [])
  .filter((val) =>
    !winningValues.includes(val));

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString().split('\n');
  const bingoDrawValues =
    input[0].split(',').map((numString) => parseInt(numString));
  const allRows = input.slice(2).filter((row) => row.length);
  const matrices = chunk(allRows);
  const winningValues = [];
  const winningMatrixIndexes = [];

  let count = 0;

  while (bingoDrawValues.length) {
    const draw = bingoDrawValues.shift();
    winningValues.push(draw);

    for (let index = 0; index < matrices.length; index++) {
      const isWinningMatrix = isBingoWinner(matrices[index], winningValues);

      if (isWinningMatrix.length && !winningMatrixIndexes.includes(index)) {
        winningMatrixIndexes.push(index);

        // const winningNumber = winningValues[winningValues.length - 1];
        // const filteredMatrixValues =
        //   matrices[index]
        //   .reduce((values, row) => [...values, ...row], [])
        //   .filter((val) =>
        //     !winningValues.includes(val));
        // const filteredMatrixValuesSum = tallySum(filteredMatrixValues);
        // return console.log(filteredMatrixValuesSum * winningNumber);

        if (winningMatrixIndexes.length === matrices.length) {
          const filteredMatrixValues = getUnamrkedNums(matrices[index], isWinningMatrix);
          console.log(draw);
          return console.log(tallySum(filteredMatrixValues) * winningValues[winningValues.length - 1]);
        }
      }
    }
  }
});
