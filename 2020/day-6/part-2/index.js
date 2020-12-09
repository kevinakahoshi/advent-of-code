const fs = require('fs');

const groupTotal = (group) => {
  const map = {};
  for (let index = 0; index < group.length; index++) {
    const groupMember = group[index];
    for (let letterIndex = 0; letterIndex < groupMember.length; letterIndex++) {
      if (!map[groupMember[letterIndex]]) {
        map[groupMember[letterIndex]] = 1;
      } else {
        map[groupMember[letterIndex]] += 1;
      }
    }
  }

  let total = 0;
  for (const key in map) {
    if (map[key] === group.length) {
      total += 1;
    }
  }

  return total;
}

fs.readFile('../data.txt', (err, data) => {
  if (err) throw err;

  const input = data.toString().trim().split('\n');
  const transformedInput = [
    []
  ];

  while (input.length) {
    if (input[0]) {
      transformedInput[transformedInput.length - 1].push(input.shift());
    } else {
      input.shift();
      transformedInput.push([input.shift()]);
    }
  }

  const groupTallies = transformedInput.map(groupTotal);
  const flightTotal = groupTallies.reduce((accum, curr) => accum + curr);
  console.log(flightTotal);

  fs.writeFile('input-groups.json', JSON.stringify(transformedInput, null, 2), (err) => {
    if (err) throw err;
    console.log('Inputs grouped successfully');
  })

  fs.writeFile('group-tallies.json', JSON.stringify(groupTallies, null, 2), (err) => {
    if (err) throw err;
    console.log('Tallies completed');
  })
})
