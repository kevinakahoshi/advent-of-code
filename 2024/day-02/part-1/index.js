const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

// Report = row
// Level = column

const diffIsSafe = (level1, level2) => {
  const diff = Math.abs(level1 - level2);
  return diff > 0 && diff < 4;
}

const isSafe = (report) => {
  const forwards = report.toSorted((a, b) => a - b);
  const backwards = report.toSorted((a, b) => b - a);

  const forwardsMatches = report.every((value, index) => value === forwards[index]);
  const backwardsMatches = report.every((value, index) => value === backwards[index]);

  if (!forwardsMatches && !backwardsMatches) return false;

  for (let start = 0, end = 1; end < report.length; start++, end++) {
    if (!diffIsSafe(report[start], report[end])) return false;
  }

  return true;
}

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const counts = data
    .toString()
    .trim()
    .split('\n')
    .map((report) => report.split(' '))
    .map((report) => isSafe(report))
    .reduce((total, safeValue) => total + Number(safeValue), 0);

  console.log(counts);
});
