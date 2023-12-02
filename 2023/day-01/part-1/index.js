const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

fs.readFile(file, (err, data) => {
  if (err) console.error(err);
  const input = data.toString().trim().split('\n').map((calibration) => {
    let start = 0;
    let end = calibration.length - 1;
    let firstNum = null;
    let secondNum = null;

    while (true) {
      if (parseInt(calibration[start])) {
        firstNum = calibration[start];
      } else {
        start++;
      }

      if (parseInt(calibration[end])) {
        secondNum = calibration[end];
      } else {
        end--
      }

      if (firstNum && secondNum) break;
    }

    return parseInt(firstNum + secondNum);
  });

  const output = input.reduce((accum, curr) => accum + curr, 0);

  console.log(output);
});
