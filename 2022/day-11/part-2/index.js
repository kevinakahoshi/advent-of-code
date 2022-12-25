const fs = require("fs");

const inputData = "../input.txt";
const sampleData = "../sample.txt";

const generateItem = (level) => {
  return {
    level
  }
}

const getId = (monkeyId) => {
  const stringId = monkeyId.replace(/[^0-9]/gi, '');
  const id = parseInt(stringId);
  return id;
}

const getItems = (monkeyItems) => {
  const items = monkeyItems.replace(/[^0-9,]/gi, '').split(',').map(Number);
  return items;
}

const generateOperatorFunction = (operator, value) => {
  value = value / 1000;

  if (!value) return (old) => old * old;
  if (operator === '+') return (old) => old + value;
  if (operator === '-') return (old) => old - value;
  if (operator === '*') return (old) => old * value;
  if (operator === '/') return (old) => old / value;
}

const getOperation = (monkeyOperation) => {
  const [operator, stringValue] = monkeyOperation.trim().replace('Operation: new = old ', '').split(' ');
  const numVal = parseInt(stringValue);

  return generateOperatorFunction(operator, numVal);
}

const getTest = (monkeyDivisor) => {
  const divisor = parseInt(monkeyDivisor.replace('Test: divisible by ', ''));
  return (value) => value % divisor === 0;
}

const getNextMonkeys = (trueMonkey, falseMonkey) => {
  return [
    parseInt(trueMonkey.replace('If true: throw to monkey ', '')),
    parseInt(falseMonkey.replace('If false: throw to monkey ', ''))
  ]
}

const generateMonkeyObject = (monkey) => {
  const [id, items, operation, test, trueMonkey, falseMonkey] = monkey;
  const [ifTrue, ifFalse] = getNextMonkeys(trueMonkey, falseMonkey);

  return {
    id: getId(id),
    items: getItems(items),
    operation: getOperation(operation),
    test: getTest(test),
    sampleCount: 0,
    next: {
      ifTrue,
      ifFalse
    }
  }
}

const calculateWorryLevel = (current) => Math.floor(current);

fs.readFile(sampleData, (err, data) => {
  const input = data.toString().trim().split('\n');
  const monkeyData = [];

  let start = 0;
  let end = 6;

  while (end <= input.length) {
    monkeyData.push(input.slice(start, end));
    start = end + 1;
    end = start + 6;
  }

  const monkeys = monkeyData.map(generateMonkeyObject);
  let rounds = 20;

  while (rounds > 0) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length) {
        const item = monkey.items.shift();
        const worryLevel = monkey.operation(item);
        const newWorryLevel = calculateWorryLevel(worryLevel);
        const testResults = monkey.test(worryLevel);
        const nextMonkeyIndex = testResults ? 'ifTrue' : 'ifFalse';
        const nextMonkey = monkey.next[nextMonkeyIndex];

        monkey.sampleCount++;
        monkeys[nextMonkey].items.push(worryLevel);
      }
    });

    rounds--;
  }

  const rankedMonkeysBySampleCount = monkeys
    .sort((monkey1, monkey2) => monkey2.sampleCount - monkey1.sampleCount);
  const [top, second] = rankedMonkeysBySampleCount;

  console.log(top, second);
});
