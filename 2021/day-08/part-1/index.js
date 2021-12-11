const fs = require('fs');
const files = {
  input: '../input.txt',
  sample: '../sample.txt'
}

fs.readFile(files.input, (err, data) => {
  if (err) throw new Error(err);

  const input = data
    .toString()
    .trim()
    .split('\n')
    .map((inputString) => {
      const [_, output] = inputString.split(' | ');
      return output.split(' ').filter((outputVal) =>
        outputVal.length === 2 ||
        outputVal.length === 3 ||
        outputVal.length === 4 ||
        outputVal.length === 7);
    })
    .reduce((accum, outputs) => [...accum, ...outputs], []);

  console.log(input.length);
});
