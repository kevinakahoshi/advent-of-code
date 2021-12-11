const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  if (err) throw err;
  const values = data.toString().split('\n').map((val) => parseInt(val));

  let total = 0;
  let lastValue = values[0];
  let currentValue = null;

  values.forEach((val) => {
    currentValue = val;
    if (currentValue > lastValue) {
      total += 1;
    }
    lastValue = currentValue;
  });

  console.log(total);
});
