const fs = require('fs');
const files = {
  input: '../input.txt',
  sample: '../sample.txt',
}

const FILE = process.argv[2] || 'sample';
const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
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
  const incomplete = [];

  // Filter out errors and find incomplete lines
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const stack = [];
    let foundError = false;

    for (let characterIndex = 0; characterIndex < line.length; characterIndex++) {
      const character = line[characterIndex];
      if (openings[character]) {
        stack.push(character);
      } else {
        const topOfStack = stack.pop();

        if (closings[topOfStack] !== character) {
          foundError = true;
          errors.push(lineIndex);
          break;
        }
      }
    }

    if (!foundError) {
      incomplete.push(stack.join(''));
    }
  }

  const completeStrings = [];

  // form complete lines
  for (let incompleteIndex = 0; incompleteIndex < incomplete.length; incompleteIndex++) {
    const incompleteLine = incomplete[incompleteIndex];
    let completeString = '';

    for (let characterIndex = incompleteLine.length - 1; characterIndex >= 0; characterIndex--) {
      const character = incompleteLine[characterIndex];
      completeString += closings[character];
    }

    completeStrings.push(completeString);
  }

  // generate point values
  const stringPoints = completeStrings.map((completeString) =>
    completeString.split('').map((character) => points[character])
  );

  // reduce points values
  const pointValues = stringPoints.map((pointsArray) =>
    pointsArray.reduce((total, pointValue) => 5 * total + pointValue, 0)
  )

  const sorted = pointValues.sort((pointA, pointB) => pointA - pointB);
  const middleIndex = Math.floor(sorted.length / 2);

  console.log(sorted[middleIndex])
});
