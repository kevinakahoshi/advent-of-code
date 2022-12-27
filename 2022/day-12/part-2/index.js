const fs = require("fs");

const inputData = "../input.txt";
const sampleData = "../sample.txt";

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n');
  console.log(input);
});
