const fs = require('fs');

const processArray = (strArr) => {
  const output = [];
  while (strArr.length) {
    if (!output.length) {
      output.push(strArr.shift());
    }

    if (strArr[0]) {
      output[output.length - 1] = output[output.length - 1].concat(` ${strArr.shift()}`);
    } else {
      strArr.shift();
      if (strArr[0]) {
        output.push(strArr.shift());
      }
    }
  }
  return output
}

fs.readFile('../data.txt', (err, data) => {
  if (err) throw err;

  const dataStrArr = data.toString().split('\n');
  const cleanedData = processArray(dataStrArr);

  const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ];

  const optionalFields = [
    'cid'
  ];

  const results = cleanedData.map((person) => {
    for (let field = 0; field < requiredFields.length; field++) {
      if (!person.includes(requiredFields[field])) return false;
    }
    return true;
  }).filter((bool) => bool).length;

  console.log(results);
});
