const fs = require('fs');

fs.readFile('../data.txt', (err, data) => {
  if (err) throw err;

  const input = data.toString().split('\n');
  let count = 0;

  for (let column = 0, row = 0; row < input.length; column += 3, row += 1) {
    if (input[row][column] === undefined) {
      column = column % input[row].length;
    }

    if (input[row][column] === '#') {
      count += 1;
    }
  }

  console.log(count);
});
