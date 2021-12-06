const fs = require('fs');

fs.readFile('../input.txt', (err, data) => {
  if (err) throw new Error(err);

  const input = data
    .toString()
    .trim()
    .split('\n')
    .map((coordinates) => coordinates.replace(' -> ', ','));
  const coordinatesMap = {};

  const generateKey = (x, y) => `${x},${y}`;

  const assignValue = (key) => {
    if (key in coordinatesMap) {
      coordinatesMap[key]++;
    } else {
      coordinatesMap[key] = 1;
    }
  }

  const handleHorizontal = (min, max, constant) => {
    for (let position = min; position <= max; position++) {
      const key = generateKey(position, constant);
      assignValue(key);
    }
  }

  const handleVertical = (min, max, constant) => {
    for (let position = min; position <= max; position++) {
      const key = generateKey(constant, position);
      assignValue(key);
    }
  }

  const handleDiagonal = (x1, y1, x2, y2) => {
    if (x1 < x2 && y1 < y2) {
      for (let x = x1, y = y1; x <= x2; x++, y++) {
        const key = generateKey(x, y);
        assignValue(key);
      }
    } else if (x1 < x2 && y1 > y2) {
      for (let x = x1, y = y1; x <= x2; x++, y--) {
        const key = generateKey(x, y);
        assignValue(key);
      }
    } else if (x1 > x2 && y1 > y2) {
      for (let x = x1, y = y1; x >= x2; x--, y--) {
        const key = generateKey(x, y);
        assignValue(key);
      }
    } else if (x1 > x2 && y1 < y2) {
      for (let x = x1, y = y1; x >= x2; x--, y++) {
        const key = generateKey(x, y);
        assignValue(key);
      }
    }
  }

  const handleXAndY = (x1, y1, x2, y2) => {
    if (y1 === y2) {
      const min = Math.min(x1, x2);
      const max = Math.max(x1, x2);

      handleHorizontal(min, max, y1);
    } else if (x1 === x2) {
      const min = Math.min(y1, y2);
      const max = Math.max(y1, y2);

      handleVertical(min, max, x1);
    } else {
      handleDiagonal(x1, y1, x2, y2);
    }
  }

  input.forEach((values) => {
    const [x1, y1, x2, y2] = values
      .split(',')
      .map((coordinate) =>
        parseInt(coordinate));

    handleXAndY(x1, y1, x2, y2);
  });

  console.log(
    Object
    .keys(coordinatesMap)
    .filter((coordinates) =>
      coordinatesMap[coordinates] > 1).length
  );
});
