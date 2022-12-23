const fs = require("fs");

const inputData = "../input.txt";
const sampleData = "../sample.txt";

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n').slice(0, 7);
  console.log(input);
});
