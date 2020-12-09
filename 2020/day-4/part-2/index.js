const fs = require('fs');

const processStringArray = (strArr) => {
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
  return output;
}

const processNumberProperties = ({ byr = null, iyr = null, eyr = null }) => {
  if (byr) {
    byr = parseInt(byr);
  }

  if (iyr) {
    iyr = parseInt(iyr);
  }

  if (eyr) {
    eyr = parseInt(eyr);
  }
}

const convertStringsToObjects = (strArr) => {
  return strArr.map((personString) => {
    const output = {};
    const splitPersonString = personString.split(' ');
    splitPersonString.map((property) => {
      const key = property.slice(0, 3);
      const value = property.slice(4);
      output[key] = value;
    });
    return output;
  });
}

fs.readFile('../data.txt', (err, data) => {
  if (err) throw err;

  const dataStrArr = data.toString().split('\n');
  const cleanedData = processStringArray(dataStrArr);

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

  const transformedPeople = convertStringsToObjects(cleanedData);
  transformedPeople.forEach(processNumberProperties);

  fs.writeFile('input.json', JSON.stringify(transformedPeople, null, 2), (err) => {
    if (err) throw err;
  })

  // Required Field Keys Check
  const removePeopleWithoutAllFields = transformedPeople.map((person) => {
    if (!person) return false;
    for (let field = 0; field < requiredFields.length; field++) {
      if (person[requiredFields[field]] === undefined) return false;
    }
    return person;
  });

  // Year data
  const removePeopleWithBunkYears = removePeopleWithoutAllFields.map((person) => {
    if (!person) return person;
    if (person.byr < 1920 || person.byr > 2002) return false;
    if (person.iyr < 2010 || person.iyr > 2020) return false;
    if (person.eyr < 2020 || person.eyr > 2030) return false;
    return person;
  });

  // Height Data
  const removePeopleWithBunkHeights = removePeopleWithBunkYears.map((person) => {
    if (!person) return person;

    if (!person.hgt.includes('in') && !person.hgt.includes('cm')) return false;

    if (person.hgt.includes('cm')) {
      const personHeight = parseInt(person.hgt.replace('cm', ''));
      if (personHeight < 150 || personHeight > 193) return false;
    } else if (person.hgt.includes('in')) {
      const personHeight = parseInt(person.hgt.replace('in', ''));
      if (personHeight < 59 || personHeight > 76) return false;
    }

    return person;
  });

  // Hair Color Data
  const removePeopleWithBunkHairColors = removePeopleWithBunkHeights.map((person) => {
    if (!person) return person;

    if (person.hcl.length !== 7) return false;
    if (person.hcl[0] !== '#') return false;

    if (!/[0-9a-f]/gi.test(person.hcl)) return false;
    return person;
  })

  // Eye Color Data
  const removePeopleWithBunkEyeColors = removePeopleWithBunkHairColors.map((person) => {
    if (!person) return person;
    switch (person.ecl) {
      case 'amb':
      case 'blu':
      case 'brn':
      case 'gry':
      case 'grn':
      case 'hzl':
      case 'oth':
        return person;
      default:
        return false;
    }
  });

  const removePeopleWithBunkPassportData = removePeopleWithBunkEyeColors.map((person) => {
    if (!person) return person;

    if (person.pid.length !== 9) return false;
    if (person.pid[0] !== '0') return false;
    if (isNaN(parseInt(person.pid))) return false;

    return person;
  });

  fs.writeFile('./output.json', JSON.stringify(removePeopleWithBunkPassportData.filter((person) => person), null, 2), 'utf8', (err, data) => data)

  console.log(removePeopleWithBunkPassportData.length);
});
