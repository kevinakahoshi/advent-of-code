const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  if (err) throw err;
  const input = data.toString().trim().split('\n');

  const moveX = input.filter((direction) =>
      direction
      .includes('forward'))
    .map((value) => parseInt(value.replace('forward ', '')))
    .reduce((total, distance) => total + distance, 0);

  const moveY = input.filter((direction) =>
      !direction.includes('forward'))
    .map((value) => value.includes('up') ?
      -parseInt(value.replace('up ', '')) :
      parseInt(value.replace('down ', '')))
    .reduce((total, direction) => total + direction, 0);

  console.log(moveX * moveY);
});
