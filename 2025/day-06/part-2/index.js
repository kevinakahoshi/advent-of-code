const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);
});
