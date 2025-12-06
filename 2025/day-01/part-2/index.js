const fs = require('fs');

const fileName = 'sample';
const file = `../${fileName}.txt`;

fs.readFile(file, async (err, data) => {
  if (err) console.error(err);

  const input = data.toString().trim().split('\n');

  const min = 0;
  const max = 99;
  let count = 0;
  let position = 50;

  for (const direction of input) {
    const lOrR = direction.at(0);
    const clicksString = direction.slice(1);
    const isLargerThanDoubleDigit = clicksString.length > 2;
    const clicksStringNumber = isLargerThanDoubleDigit
      ? clicksString.slice(-2)
      : clicksString;
    const timesPastZero = isLargerThanDoubleDigit
      ? Number(clicksString.slice(0, -2))
      : 0;
    const clicks = parseInt(clicksStringNumber, 10);
    const multiplier = lOrR === 'R' ? 1 : -1;
    const next = position + clicks * multiplier;
    const updatedPosition =
      next < min ? max + next + 1 : next > max ? next - max - 1 : next;

    const leftTurnCount = Number(next < min);
    const rightTurnCount = Number(next > max);

    position = updatedPosition;

    const countUpdate =
      Number(position === 0) + leftTurnCount + rightTurnCount + timesPastZero;

    count += countUpdate;
  }

  console.table({ count });
});
