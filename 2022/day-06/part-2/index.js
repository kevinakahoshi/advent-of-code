const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  const input = data.toString();

  const markerSize = 14;

  for (let start = 0, end = markerSize; end < input.length; start++, end++) {
    const characters = new Set([...input.slice(start, end)]);

    if (characters.size === markerSize) {
      console.table({
        end
      });
      return;
    }
  }
});
