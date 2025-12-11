const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const [idRangeStrs, availableIdStrs] = data
    .toString()
    .trim()
    .split('\n\n')
    .map((val) => val.split('\n'));
  const idRanges = idRangeStrs.map((val) => val.split('-').map(Number));
  const availableIds = availableIdStrs.map(Number);

  const count = availableIds.reduce((total, id) => {
    const isFresh = !!idRanges.find(
      (range) => range.at(0) <= id && id <= range.at(1)
    );
    return total + Number(isFresh);
  }, 0);

  console.table({ count });
});
