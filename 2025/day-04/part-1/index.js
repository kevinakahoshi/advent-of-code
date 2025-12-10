const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const input = data
    .toString()
    .trim()
    .split('\n')
    .map((row) => row.split(''));

  const count = input.reduce((total, row, rIndex) => {
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
            input[prevRow]?.[prevCol],
            input[prevRow]?.[cIndex],
            input[prevRow]?.[nextCol],
            row[prevCol],
            row[nextCol],
            input[nextRow]?.[prevCol],
            input[nextRow]?.[cIndex],
            input[nextRow]?.[nextCol],
          ].filter((char) => char === '@').length < 4;

        return rowTotal + Number(isValid);
      }, 0)
    );
  }, 0);

  console.table({ count });
});
