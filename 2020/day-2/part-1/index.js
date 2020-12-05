const data = require('../data');

const splitBySpaces = (dataArr) => dataArr.map((dataStr) => dataStr.split(' '));
const splitByDashes = (dataArr) => dataArr.map((inputArr) => [
  inputArr[0].split('-'),
  ...inputArr.slice(1)
]);
const replaceColons = (dataArr) => dataArr.map((inputArr) => [
  ...inputArr.slice(0, 1),
  inputArr[1].replace(':', ''),
  ...inputArr.slice(2)
]);
const createMap = (dataArr) => dataArr.map((inputArr) => ({
  min: inputArr[0][0],
  max: inputArr[0][1],
  letter: inputArr[1],
  password: inputArr[2]
}));

const spaces = splitBySpaces(data);
const dashes = splitByDashes(spaces);
const colons = replaceColons(dashes);
const map = createMap(colons);

const confirmIfPasswordIsLegit = ({ min, max, letter, password }) => {
  let total = 0;
  for (let index = 0; index < password.length; index++) {
    if (password[index] === letter) {
      total += 1;
    }
  }
  if (total >= min && total <= max) return true;
  return false;
}

const goodPasswords = (dataArr) => {
  return dataArr.map((pass) => confirmIfPasswordIsLegit(pass))
    .filter((element) => element === true).length;
}

console.log(goodPasswords(map))
