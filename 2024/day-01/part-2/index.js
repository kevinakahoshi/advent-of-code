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

    const similarityCount = right.reduce((counts, value) => {
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});

    const counts = [];

    left.forEach((val) => {
      const value = val * (similarityCount[val] || 0);
      if (!value) return;
      counts.push(value);
    });

    const sum = counts.reduce((total, value) => total + value, 0);

    console.log(sum)
});
