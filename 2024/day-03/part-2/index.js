const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

const regex = /mul\([0-9]+,[0-9]+\)/gi;

const getValues = (match) => {
  const replaced = match.replace('mul(', '').replace(')', '');
  const split = replaced.split(',');
  const values = split.map(Number);
  return values;
};

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const input = [...data.toString().trim().match(regex)]
    .map((match) => getValues(match))
    .map(([first, second]) => first * second)
    .reduce((total, mul) => total + mul, 0);

  console.log(input);
});
