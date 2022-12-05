const fs = require('fs');

const isLowerCase = (character) => character === character.toLowerCase();

const getPriority = (item) => {
  const code = item.charCodeAt(0);
  return code - (isLowerCase(item) ? 96 : 38);
}

const groupByThree = (rucksacks) => rucksacks.reduce((groups, rucksack, index) => {
  const isNewGroup = index % 3 === 0;
  if (isNewGroup) return [...groups, [rucksack]];

  const last = groups.length - 1;
  groups[last].push(rucksack);
  return groups;
}, []);

fs.readFile('../input.txt', (err, data) => {
  const rucksacks = data.toString().trim().split('\n');

  const groups = groupByThree(rucksacks);

  const badges = [];

  groups.forEach((group) => {
    const [r1, r2, r3] = group.map((rucksack) => new Set([...rucksack]));

    r1.forEach((item) => {
      if (r2.has(item) && r3.has(item)) {
        badges.push(item);
      }
    });
  });

  const priorities = badges.map((badge) => getPriority(badge));
  const sum = priorities.reduce((total, priority) => total + priority, 0);

  console.log(sum);
});
