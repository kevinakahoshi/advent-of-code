const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, async (err, data) => {
  if (err) console.error(err);

  const input = data.toString().trim().split('\n');
});
