const fs = require('fs');

const fileName = 'input';
const file = `../${fileName}.txt`;

const defaultColorCounts = {
  red: 0,
  green: 0,
  blue: 0
};

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
          }, { ...defaultColorCounts });

          results.push(roundResult);
          return results;
        }, [])
        .reduce((results, round) => {
          Object.entries(round).forEach(([color, count]) => {
            results[color] = Math.max(results[color], count);
          });
          return results;
        }, { ...defaultColorCounts });

      const power = Object.values(rounds).reduce((p, count) => p * count, 1);

      return power;
    })
    .reduce((sum, power) => sum + power, 0);

  console.log(output);
});
