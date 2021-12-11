const fs = require('fs');
const files = {
  input: '../input.txt',
  sample: '../sample.txt',
}

const FILE = process.argv[2] || 'sample';
const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}
const openings = {
  '(': '(',
  '[': '[',
  '{': '{',
  '<': '<',
}
const closings = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

fs.readFile(files[FILE], (err, data) => {
  if (err) throw new Error(err);

  const lines = data.toString().trim().split('\n');
  const errors = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const stack = [];

    for (let characterIndex = 0; characterIndex < line.length; characterIndex++) {
      const character = line[characterIndex];
      if (openings[character]) {
        stack.push(character);
      } else {
        const topOfStack = stack.pop();

        if (closings[topOfStack] !== character) {
          errors.push(character);
          break;
        }
      }
    }
  }

  console.log(
    errors
    .map((character) => points[character])
    .reduce((total, pointValue) => total + pointValue, 0)
  );
});
