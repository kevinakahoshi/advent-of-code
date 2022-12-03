const fs = require('fs');

/*

Opponent:
- A :: Rock
- B :: Paper
- C :: Scissors

Me:
- X :: Rock -> 1 point
- Y :: Paper -> 2 points
- Z :: Scissors - 3 points

Outcome:
- L :: Loss -> 0 points
- D :: Draw -> 3 points
- W :: Win -> 6 points

Score:
- Me + Outcome

*/

const winMap = {
  A: 'Y',
  B: 'Z',
  C: 'X'
};

const drawMap = {
  A: 'X',
  B: 'Y',
  C: 'Z'
}

const shapePoints = {
  X: 1,
  Y: 2,
  Z: 3
}

const outcomeMap = {
  L: 0,
  D: 3,
  W: 6
};

const getRoundScore = (shape, outcome) => {
  return shapePoints[shape] + outcomeMap[outcome];
}

fs.readFile('../input.txt', (err, data) => {
  const values = data.toString().trim().split('\n');

  const scores = values.map((round) => {
    const opponent = round[0];
    const me = round[round.length - 1];
    if (winMap[opponent] === me) return getRoundScore(me, 'W');
    if (drawMap[opponent] === me) return getRoundScore(me, 'D');
    return getRoundScore(me, 'L');
  });

  const finalScore = scores.reduce((total, roundScore) => total + roundScore, 0);

  console.log(finalScore);
});
