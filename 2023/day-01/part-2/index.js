const fs = require('fs');

const fileName = 'sample';
const file = `./${fileName}.txt`;

const dayMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
}

fs.readFile(file, (err, data) => {
  if (err) console.error(err);
  const input = data.toString().trim().split('\n').map((calibration) => {
    console.log(calibration);

    return calibration

    // let start = 0;
    // let end = calibration.length - 1;
    // let firstNum = null;
    // let secondNum = null;

    // while (true) {
    //   if (parseInt(calibration[start])) {
    //     firstNum = calibration[start];
    //   } else {
    //     start++;
    //   }

    //   if (parseInt(calibration[end])) {
    //     secondNum = calibration[end];
    //   } else {
    //     end--
    //   }

    //   if (firstNum && secondNum) break;
    // }

    // return parseInt(firstNum + secondNum);
  });

  // const output = input.reduce((accum, curr) => accum + curr, 0);

  // console.log(output);
});
