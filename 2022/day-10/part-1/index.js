const fs = require("fs");

const inputData = "../input.txt";
const sampleData = "../sample.txt";

const isProperStrengthCycle = (cycle) => (cycle - 20) % 40 === 0;

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n');
  const inputQueue = [...input];

  const signalStrength = [];
  let x = 1;
  let cycle = 0;

  while (inputQueue.length) {
    const instructions = inputQueue.shift().split(' ');
    const [instruction, value] = instructions;
    const numValue = parseInt(value);

    for (let count = 0; count < instructions.length; count++) {
      cycle++;

      if (isProperStrengthCycle(cycle)) {
        signalStrength.push(cycle * x);
      }
    }

    const nextX = numValue || 0;
    x += nextX;
  }

  const signalStrengthSum = signalStrength.reduce((total, strength) => total + strength, 0);

  console.log(signalStrength);
  console.table({
    signalStrengthSum
  });
});
