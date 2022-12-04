const fs = require('fs');

const isLowerCase = (character) => character === character.toLowerCase();

const getPriority = (item) => {
  const code = item.charCodeAt(0);
  return code - (isLowerCase(item) ? 96 : 38);
}

fs.readFile('../input.txt', (err, data) => {
  const rucksacks = data.toString().trim().split('\n');

  const duplicateItems = [];

  rucksacks.forEach((rucksack) => {
    const secondStart = rucksack.length / 2;
    const first = rucksack.slice(0, secondStart);
    const second = rucksack.slice(secondStart);

    const items = new Set([...first]);

    for (const item of second) {
      if (items.has(item)) {
        duplicateItems.push(item);
        break;
      }
    }
  });

  const priorities = duplicateItems.map((item) => getPriority(item));

  const sum = priorities.reduce((total, priority) => total + priority, 0);
  console.log(sum);
});
