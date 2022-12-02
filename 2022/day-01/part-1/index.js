const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const values = data.toString().split('\n').map((val) => parseInt(val));

  const totals = values.reduce((accum, curr) => {
    if (isNaN(curr)) return [...accum, 0];

    const last = accum.length - 1;
    accum[last] += curr;

    return accum;
  }, [0]);

  console.log(Math.max(...totals));
});
