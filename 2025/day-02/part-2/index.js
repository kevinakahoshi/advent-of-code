const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, async (err, data) => {
  if (err) console.error(err);

  const input = data.toString().trim().split(',');

  const total = input.reduce((count, rangeString) => {
    const [start, end] = rangeString.split('-').map(Number);

    let localCount = 0;
    for (let val = start; val <= end; val++) {
      const numString = val.toString();

      const isRepeated =
        new Array(2).fill(numString).join('').indexOf(numString, 1) !==
        numString.length;

      localCount += Number(isRepeated && val);
    }

    return count + localCount;
  }, 0);

  console.table({ total });
});
