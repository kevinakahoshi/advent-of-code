const fs = require('fs');

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

  const consolidatedInputs = transformedInput.map((group) => group.reduce((accum, curr) => accum + curr));

  const removeDuplicateLetters = consolidatedInputs.map((group) => {
    const output = {};
    const splitGroup = group.split('');
    splitGroup.forEach((letter) => {
      if (!output[letter]) {
        output[letter] = letter;
      }
    });
    return Object.keys(output).join('');
  });

  fs.writeFile('transformed-string.json', JSON.stringify(removeDuplicateLetters, null, 2), (err) => {
    if (err) throw err;
    console.log('Transformation complete');
  });

  const yesTotals = removeDuplicateLetters.map((group) => group.length);

  console.log(yesTotals.reduce((accum, curr) => accum + curr));
})
