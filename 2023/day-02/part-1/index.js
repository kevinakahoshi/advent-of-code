const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

const maxReds = 12;
const maxGreens = 13;
const maxBlues = 14;

const checkIfRoundIsPossible = ({ red = 0, green = 0, blue = 0 }) =>
  red <= maxReds && green <= maxGreens && blue <= maxBlues;

fs.readFile(file, (err, data) => {
  const output = data
    .toString()
    .trim()
    .split('\n')
    .map((game) => {
      const [gameNumber, inputs] = game.split(': ');
      const id = parseInt(gameNumber.replace('Game ', ''));

      const rounds = inputs.split('; ')
        .map((round) => round.split(', '))
        .reduce((results, round) => {
          const roundResult = round.reduce((colorMap, cubes) => {
            const [stringCount, color] = cubes.split(' ');
            const count = parseInt(stringCount);
            colorMap[color] = count;

            return colorMap;
          }, {});

          results.push(roundResult);
          return results;
        }, []);

      return [id, rounds];
    })
    .filter(([id, counts]) => {
      const gameIsPossible = counts.every((count) => checkIfRoundIsPossible(count));
      return gameIsPossible
    })
    .map(([id]) => id)
    .reduce((sum, id) => sum + id, 0);

  console.log(output);
});
