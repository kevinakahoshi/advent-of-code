const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const rucksacks = data.toString().trim().split('\n');

  console.log(rucksacks);
});
