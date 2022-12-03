const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const values = data.toString().split('\n');

  console.log(values);
});
