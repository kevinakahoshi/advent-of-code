const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const values = data.toString().split('\n').map((val) => parseInt(val));

  const totals = [0];

  values.forEach((value) => {
    const last = totals.length - 1;
    if (isNaN(value)) {
      totals.push(0);
    } else {
      totals[last] += value;
    }
  });

  const topThree = totals.sort((val1, val2) => val2 - val1).slice(0, 3).reduce((accum, curr) => accum + curr, 0);
  console.table({
    topThree
  });
});
