const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString().split('\n').map((val) => parseInt(val));

  let total = 0;
  let previous = input[0] + input[1] + input[2];
  let current = null;

  for (
    let start = 0, middle = 1, end = 2; end < input.length; start++, middle++, end++) {
    current = input[start] + input[middle] + input[end];
    if (current > previous) {
      total += 1;
    }
    previous = current;
  }

  console.log(total);
})
