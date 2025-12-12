const fs = require('fs');

const fileName = 'sample';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const input = data
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.split(' ').filter(Boolean));

  let total = 0;

  for (let col = 0; col < input.at(0).length; col++) {
    const column = [];

    for (let row = 0; row < input.length; row++) {
      column.push(input[row][col]);
    }

    const operator = column.pop();
    const isAddition = operator === '+';

    total += column
      .map((num) => parseInt(num))
      .reduce(
        (sum, num) => (isAddition ? sum + num : sum * num),
        isAddition ? 0 : 1
      );
  }

  console.table({ total });
});
