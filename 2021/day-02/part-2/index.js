const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString().trim().split('\n');

  let x = 0;
  let aim = 0;
  let depth = 0;

  input.forEach((command) => {
    if (command.includes('forward')) {
      const localX = parseInt(command.replace('forward ', ''));
      x += localX;
      depth += localX * aim;
    } else {
      if (command.includes('up')) {
        aim -= parseInt(command.replace('up ', ''));
      } else {
        aim += parseInt(command.replace('down ', ''));
      }
    }
  });

  console.table(x * depth);
});
