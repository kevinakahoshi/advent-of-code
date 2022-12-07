const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString();

  for (let start = 0, end = 4; end < input.length; start++, end++) {
    const characters = new Set([...input.slice(start, end)]);

    if (characters.size === 4) {
      console.table({
        end
      });
      return;
    }
  }
});
