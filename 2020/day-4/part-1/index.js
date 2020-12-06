const { error } = require('console');
const fs = require('fs');

/*


byr:1933 hcl:# 888785

Pass 0 = []
Pass 1 = [byr: 2010 pid: #1bb4d8 eyr:2021 hgt:186cm iyr:2020 ecl:grt]
Pass 2 = [byr: 2010 pid: #1bb4d8 eyr:2021 hgt:186cm iyr:2020 ecl:grt, pid:937877382 eyr:2029]
Pass 3 = [byr: 2010 pid: #1bb4d8 eyr:2021 hgt:186cm iyr:2020 ecl:grt, pid:937877382 eyr:2029]

*/

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
  }).filter((bool) => bool === true).length;

  console.log(results);
});
