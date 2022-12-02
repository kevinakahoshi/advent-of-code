const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const values = data.toString().split('\n').map((val) => parseInt(val));

  const totals = [0];
  let max = 0;
  let maxIndex = 0;

  values.forEach((value) => {
    const last = totals.length - 1;
    if (isNaN(value)) {
      totals.push(0);
    } else {
      totals[last] += value;
    }

    if (totals[last] > max) {
      max = totals[last];
      maxIndex = last;
    }
  });

  console.table({
    max,
  })
});
