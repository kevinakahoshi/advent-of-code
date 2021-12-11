const fs = require('fs');

fs.readFile('../input.txt', 'utf-8', (err, data) => {
  if (err) throw new Error(err);

  const input = data.toString().trim().split(',').map((val) => parseInt(val));

  let lanternFish = [...input];
  let days = 80;

  while (days > 0) {
    const newLanternFish = [];
    const adjustedLanternFish = lanternFish.map((fish) => {
      if (fish - 1 === -1) {
        newLanternFish.push(8);
        return 6;
      }
      return fish - 1;
    });

    lanternFish = [...adjustedLanternFish, ...newLanternFish];
    days--;
  }

  console.log(lanternFish.length)
})
