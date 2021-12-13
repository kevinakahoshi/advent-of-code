const fs = require('fs');
const FILE = process.argv[2] || 'sample';
const files = {
  input: '../input.txt',
  sample: '../sample.txt',
}

fs.readFile(files[FILE], (err, data) => {
  if (err) throw new Error(err);

  const octopusMatrix = data
    .toString()
    .trim()
    .split('\n')
    .map((row) =>
      row.split('')
      .map((octopus) =>
        parseInt(octopus)
      )
    );

  const octopusMemo = octopusMatrix.reduce((memo, row, rowIndex) => {
    row.forEach((octopusEnergyLevel, columnIndex) => {
      const coordinates = `${rowIndex}-${columnIndex}`;
      memo[coordinates] = octopusEnergyLevel;
    });
    return memo;
  }, {});

  let totalFlashes = 0;
  let steps = 100;

  const generateKey = (row, column) => `${row}-${column}`;

  const flash = (row, column) => {
    const coordinates = generateKey(row, column);
    if (octopusMemo[coordinates] < 9) return;

    totalFlashes++;
    steps--;
    octopusMemo[coordinates] = 0;

    const upRow = generateKey(row - 1, column);
    const downRow = generateKey(row + 1, column);
    const leftColumn = generateKey(row, column - 1);
    const rightColumn = generateKey(row, column + 1);

    if (upRow in octopusMemo) {
      octopusMemo[upRow]++;
      flash(row - 1, column);
    }

    if (downRow in octopusMemo) {
      octopusMemo[downRow]++;
      flash(row + 1, column);
    }

    if (leftColumn in octopusMemo) {
      octopusMemo[leftColumn]++;
      flash(row, column - 1);
    }

    if (rightColumn in octopusMemo) {
      octopusMemo[rightColumn]++;
      flash(row, column + 1);
    }
  }

  const updateMatrix = () => {
    for (let row = 0; row < octopusMatrix.length; row++) {
      const octopuses = octopusMatrix[row];

      for (let column = 0; column < octopuses.length; column++) {
        const coordinates = `${row}-${column}`;
        octopusMemo[coordinates]++;

        steps--;

        if (octopusMemo[coordinates] === 9) flash(row, column);
      }
    }
  }

  while (steps >= 0) {
    updateMatrix();
  }

  console.log(totalFlashes);
});
