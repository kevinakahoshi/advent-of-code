const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const { left, right } = data
    .toString()
    .trim()
    .split('\n')
    .map((row) => row.split('   '))
    .reduce((accum, [left, right]) => {
      accum.left.push(left);
      accum.right.push(right);
      return accum;
    }, {
      left: [],
      right: []
    });

  const sortedLeft = left.sort((a, b) => a - b);
  const sortedRight = right.sort((a, b) => a - b);

  const diff = [];

  sortedLeft.forEach((left, index) => {
    diff.push(Math.abs(left - sortedRight[index]));
  });

  const sum = diff.reduce((accum, total) => accum + total, 0);

  console.log(sum);
});
