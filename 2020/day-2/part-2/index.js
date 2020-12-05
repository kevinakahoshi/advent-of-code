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
  pos1: inputArr[0][0] - 1,
  pos2: inputArr[0][1] - 1,
  letter: inputArr[1],
  password: inputArr[2]
}));

const spaces = splitBySpaces(data);
const dashes = splitByDashes(spaces);
const colons = replaceColons(dashes);
const map = createMap(colons);

const confirmIfPasswordIsLegit = ({ pos1, pos2, letter, password }) => {
  if (password[pos1] === letter && password[pos2] === letter) return false;
  if (password[pos1] !== letter && password[pos2] !== letter) return false;
  return true;
}

const goodPasswords = (dataArr) => {
  return dataArr.map((pass) => confirmIfPasswordIsLegit(pass))
    .filter((element) => element === true).length;
}

console.log(goodPasswords(map))
