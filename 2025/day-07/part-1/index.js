const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const input = data
    .toString()
    .trim()
    .split('\n')
    .map((row) => row.split(''));

  const indexOfS = input.at(0).indexOf('S');
  input[1][indexOfS] = '|';

  for (let row = 1; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === '^') {
        let localLeftCol = col - 1;
        let localRightCol = col + 1;
        let localRow = row + 1;

        while (input[localRow]?.[localLeftCol] === '.') {
          input[localRow][localLeftCol] = '|';
          localRow++;
        }

        localRow = row + 1;

        while (input[localRow]?.[localRightCol] === '.') {
          input[localRow][localRightCol] = '|';
          localRow++;
        }
      }
    }
  }

  const output = input.map((row) => row.join('')).join('\n');

  fs.writeFile('output.txt', output, (err) => {
    if (err) console.error(err);
    console.log('Complete');
  });
});
