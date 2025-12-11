const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const [idRangeStrs] = data
    .toString()
    .trim()
    .split('\n\n')
    .map((val) => val.split('\n'));
  const count = idRangeStrs
    .map((val) => val.split('-').map(Number))
    .sort((a, b) => a.at(0) - b.at(0))
    .reduce((ranges, currentRange) => {
      if (!ranges.length) {
        ranges.push(currentRange);
        return ranges;
      }

      const lastRange = ranges.at(-1);

      const [cStart, cEnd] = currentRange;
      const [lStart, lEnd] = lastRange;

      if (cStart >= lStart && cStart < lEnd && cEnd > lStart && cEnd <= lEnd)
        return ranges;

      if (cStart <= lEnd && cEnd > lEnd) {
        ranges[ranges.length - 1][1] = cEnd;
        return ranges;
      }

      if (cStart > lEnd) {
        ranges.push(currentRange);
        return ranges;
      }

      return ranges;
    }, [])
    .reduce((total, [min, max]) => total + (max - min) + 1, 0);

  console.table({ count });
});
