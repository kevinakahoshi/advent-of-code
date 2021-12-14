const fs = require('fs');
const FILE = process.argv[2] || 'sample';
const files = {
  input: '../input.txt',
  sample: '../sample.txt',
}

fs.readFile(files[FILE], (err, data) => {
  if (err) throw new Error(err);

  const adjacencyList = data.toString().trim().split('\n').reduce((list, tunnel) => {
    const [start, end] = tunnel.split('-');

    if (!(start in list)) {
      list[start] = [];
    }

    if (!(end in list)) {
      list[end] = [];
    }

    list[start] = [...list[start], end];
    list[end] = [...list[end], start];

    return list;
  }, {});

  console.log(adjacencyList);
});
