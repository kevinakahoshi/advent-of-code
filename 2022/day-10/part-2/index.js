const fs = require("fs");

const inputData = "../input.txt";
const sampleData = "../sample.txt";

const isProperStrengthCycle = (cycle) => (cycle - 20) % 40 === 0;

const generateScreen = () => new Array(6).fill(null).map(() => new Array(40).fill('.'));

const chunk = (array, size) => {
  const output = [
    []
  ];

  for (let index = 0; index < array.length; index++) {
    const pixel = array[index];
    const last = output[output.length - 1];

    if (last.length === size) {
      output.push([pixel]);
    } else {
      last.push(pixel);
    }
  }

  return output;
}

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n');
  const inputQueue = [...input];

  const screen = generateScreen();

  const signalStrength = [];
  let x = 1;
  let cycle = 0;

  let spriteStart = 0;
  let spriteEnd = 2;

  let row = 0;

  // const spriteScreen = [...('#'.repeat(3)), ...('.'.repeat(37))];

  while (inputQueue.length) {
    const instructions = inputQueue.shift().split(' ');
    const [instruction, value] = instructions;
    const numValue = parseInt(value);

    for (let count = 0; count < instructions.length; count++) {
      cycle++;

      if (cycle >= spriteStart && cycle <= spriteEnd) {
        screen[row][cycle - 1] = '#';
      }

      // if (isProperStrengthCycle(cycle)) {
      //   signalStrength.push(cycle * x);
      // }
    }

    spriteStart += numValue || 0;
    spriteEnd += numValue || 0;

    if (cycle % 40 === 0) {
      cycle = 0;
      row += 1;
    }

    console.table({
      spriteStart,
      spriteEnd,
      cycle,
      row
    })

    // const nextX = numValue || 0;
    // x += nextX;
  }

  console.log(screen.map((row) => row.join('')));
  // const signalStrengthSum = signalStrength.reduce((total, strength) => total + strength, 0);

  //   console.log(signalStrength);
  //   console.table({
  //     signalStrengthSum
  //   });
});
