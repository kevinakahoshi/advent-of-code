const fs = require('fs');

const fileName = 'sample';
const file = `../${fileName}.txt`;

const getDistancePart = (num1, num2) => Math.pow(num1 - num2, 2);

const getDistanceRaw = (c1, c2) => {
  const [c1x, c1y, c1z] = c1;
  const [c2x, c2y, c2z] = c2;

  return Math.sqrt(
    getDistancePart(c1x, c2x) +
      getDistancePart(c1y, c2y) +
      getDistancePart(c1z, c2z)
  );
};

const calculateDistance = (c1, c2) => {
  return {
    c1,
    c2,
    distance: getDistanceRaw(c1, c2),
  };
};

fs.readFile(file, (err, data) => {
  if (err) console.error(err);

  const input = data
    .toString()
    .trim()
    .split('\n')
    .map((coordinates) =>
      coordinates.split(',').map((coordinate) => parseInt(coordinate, 10))
    );

  const distances = input.map((coordinates, index) => {
    const otherCoordinates = [
      ...input.slice(0, index),
      ...input.slice(index + 1),
    ];
    const distances = otherCoordinates.map((coorinateSet) =>
      calculateDistance(coordinates, coorinateSet)
    );
    const lowest = Math.min(...distances.map(({ distance }) => distance));

    return distances.find(({ distance }) => distance === lowest);
  });

  console.log(distances);
});
