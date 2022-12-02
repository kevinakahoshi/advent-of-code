const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString().split('\n').map((val) => parseInt(val));
  console.log(input);
})
