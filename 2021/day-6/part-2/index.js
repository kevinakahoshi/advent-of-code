const fs = require('fs');

fs.readFile('../sample.txt', 'utf-8', (err, data) => {
  if (err) throw new Error(err);

  const input = data
    .toString()
    .trim()
    .split(',')
    .map((val) => parseInt(val))
    .reduce((fishies, fish) => {
      (fish in fishies) ?
      fishies[fish]++:
        fishies[fish] = 1;

      return fishies;
    }, {});

  const fishStates = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    ...input
  };

  // input.forEach((fish) => fishStates[fish] = fish);



  console.log(fishStates)
})
