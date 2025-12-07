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

      if (numString.length % 2 !== 0) continue;

      const halfIndex = numString.length / 2;
      const firstHalf = numString.slice(0, halfIndex);
      const secondHalf = numString.slice(halfIndex);

      localCount += Number(firstHalf === secondHalf && val);
    }

    return count + localCount;
  }, 0);

  console.table({ total });
});
