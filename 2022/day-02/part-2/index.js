const fs = require('fs');

/*

Opponent:
- A :: Rock
- B :: Paper
- C :: Scissors

Me:
- X :: Rock -> 1 point
- Y :: Paper -> 2 points
- Z :: Scissors -> 3 points

Outcome:
- L :: Loss -> 0 points
- D :: Draw -> 3 points
- W :: Win -> 6 points

Score:
- Me + Outcome

*/

const opponentMap = {
  A: {
    X: 'Z',
    Y: 'X',
    Z: 'Y'
  },
  B: {
    X: 'X',
    Y: 'Y',
    Z: 'Z'
  },
  C: {
    X: 'Y',
    Y: 'Z',
    Z: 'X'
  }
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
    const outcome = round[round.length - 1];

    const me = opponentMap[opponent][outcome];

    if (outcome === 'Z') return getRoundScore(me, 'W');
    if (outcome === 'Y') return getRoundScore(me, 'D');
    return getRoundScore(me, 'L');
  });

  const finalScore = scores.reduce((total, roundScore) => total + roundScore, 0);

  console.log(finalScore);
});
