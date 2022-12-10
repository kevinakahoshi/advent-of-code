const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString().trim().split('\n');
  console.log(input);
});
