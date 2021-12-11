const fs = require('fs');
const sample = '../sample.txt';
const input = '../input.txt';

const findSum = (num) => new Array(num)
  .fill(null)
  .reduce((accum, val, index) =>
    accum + index + 1,
    0
  );

fs.readFile(input, (err, data) => {
  if (err) throw new Error(err);
  const crabs = data.toString().trim().split(',').map((val) => parseInt(val));
  const crabPositionLength = Math.max(...crabs);

  let minPosition = 0;
  let minFuelSpent = Infinity;

  for (let position = 0; position < crabPositionLength; position++) {
    let fuelSpent = 0;

    for (let crab = 0; crab < crabs.length; crab++) {
      const steps = Math.abs(position - crabs[crab]);
      fuelSpent += findSum(steps);
    }

    if (fuelSpent < minFuelSpent) {
      minPosition = position;
      minFuelSpent = fuelSpent;
    }
  }

  console.table({
    minPosition,
    minFuelSpent
  });
});
