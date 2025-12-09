const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const input = data.toString().trim().split('\n');

  const sum = input.reduce((maxPower, bank) => {
    const powerBank = bank.split('').map(Number);

    const max = Math.max(...powerBank);
    const maxIndex = powerBank.indexOf(max);

    const prevSlice = powerBank.slice(0, maxIndex);
    const prevMax = Math.max(...prevSlice);

    const nextSlice = powerBank.slice(maxIndex + 1);
    const nextMax = Math.max(...nextSlice);

    if (!nextSlice.length) return maxPower + Number(`${prevMax}${max}`);
    return maxPower + Number(`${max}${nextMax}`);
  }, 0);

  console.table({ sum });
});
