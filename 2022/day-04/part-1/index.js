const fs = require('fs');

const formNumberString = (startThroughEnd) => {
  const [sStart, sEnd] = startThroughEnd.split('-');
  const start = parseInt(sStart);
  const end = parseInt(sEnd);

  let output = '';
  let current = start;

  while (current <= end) {
    output += `[${current}]`;
    current++;
  }

  return output;
}

const fullyContains = (range1, range2) =>
  range1.includes(range2) || range2.includes(range1);

fs.readFile('../input.txt', (err, data) => {
  const pairs = data.toString()
    .trim()
    .split('\n')
    .map((pair) => pair.split(','));

  const fullyContainedPairs = pairs.filter((pair) => {
    const [elf1, elf2] = pair;

    const range1 = formNumberString(elf1);
    const range2 = formNumberString(elf2);

    if (fullyContains(range1, range2)) return pair;
  });

  console.log(fullyContainedPairs.length);
});
