const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString().trim().split('\n');

  const filterByBit = (arr, index, bit) => arr.filter((val) => val[index] === bit);

  const findLifeSupportValue = (binaryArray, index, searchValue) => {
    if (binaryArray.length === 1) return binaryArray[0];

    let ones = 0;
    let zeroes = 0;

    binaryArray.forEach((row) => parseInt(row[index]) ? ones++ : zeroes++);

    const nextBit = (searchValue && ones >= zeroes) || (!searchValue && zeroes > ones) ? '1' : '0';
    const filteredList = filterByBit(binaryArray, index, nextBit);

    return findLifeSupportValue(filteredList, index + 1, searchValue);
  }

  const oxygen = findLifeSupportValue(input, 0, 1);
  const cO2 = findLifeSupportValue(input, 0, 0);

  console.log(parseInt(oxygen, 2) * parseInt(cO2, 2));
});
