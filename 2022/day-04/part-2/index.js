const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const pairs = data.toString()
    .trim()
    .split('\n')
    .map((pair) => pair.split(','));

  const fullyContainedPairs = pairs.filter((pair) => {
    const [elf1, elf2] = pair;

    const [e1Start, e1End] = elf1.split('-').map(Number);
    const [e2Start, e2End] = elf2.split('-').map(Number);

    if (e1Start >= e2Start && e1Start <= e2End) return true;
    if (e2Start >= e1Start && e2Start <= e1End) return true;
    if (e1End >= e2Start && e1End <= e2End) return true;
    if (e2End >= e1Start && e2End <= e1End) return true;
    return false;
  });

  console.log(fullyContainedPairs.length);
});
