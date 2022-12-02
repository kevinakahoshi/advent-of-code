const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const values = data.toString().split('\n').map((val) => parseInt(val));

  const totals = values.reduce((accum, curr) => {
    if (isNaN(curr)) return [...accum, 0];

    const last = accum.length - 1;
    accum[last] += curr;

    return accum;
  }, [0]);

  const topThree = totals.sort((val1, val2) => val2 - val1).slice(0, 3).reduce((accum, curr) => accum + curr, 0);

  console.table({
    topThree
  });
});
