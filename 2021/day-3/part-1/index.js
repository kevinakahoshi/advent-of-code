const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString().trim().split('\n');
  let gammaRate = '';
  let epsilonRate = '';

  for (let column = 0; column < input[0].length; column++) {
    let ones = 0;
    let zeroes = 0;

    for (let row = 0; row < input.length; row++) {
      if (input[row][column] === '0') {
        zeroes++;
      } else {
        ones++;
      }
    }

    ones > zeroes ? gammaRate += '1' : gammaRate += '0';
  }

  for (let index = 0; index < gammaRate.length; index++) {
    gammaRate[index] === '0' ? epsilonRate += '1' : epsilonRate += '0';
  }

  console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))
});
