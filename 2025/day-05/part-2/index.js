const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

const recursivePaperRemoval = (matrix) => {
  const count = matrix.reduce((total, row, rIndex) => {
    return (
      total +
      row.reduce((rowTotal, col, cIndex) => {
        if (col === '.') return rowTotal;

        const prevRow = rIndex - 1;
        const nextRow = rIndex + 1;
        const prevCol = cIndex - 1;
        const nextCol = cIndex + 1;

        const isValid =
          [
            matrix[prevRow]?.[prevCol],
            matrix[prevRow]?.[cIndex],
            matrix[prevRow]?.[nextCol],
            row[prevCol],
            row[nextCol],
            matrix[nextRow]?.[prevCol],
            matrix[nextRow]?.[cIndex],
            matrix[nextRow]?.[nextCol],
          ].filter((char) => char === '@').length < 4;

        if (isValid) {
          matrix[rIndex][cIndex] = '.';
        }

        return rowTotal + Number(isValid);
      }, 0)
    );
  }, 0);

  return count ? count + recursivePaperRemoval(matrix) : count;
};

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const input = data
    .toString()
    .trim()
    .split('\n')
    .map((row) => row.split(''));

  const count = recursivePaperRemoval(input);

  console.table({ count });
});
