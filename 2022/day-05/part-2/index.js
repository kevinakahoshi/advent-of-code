const fs = require('fs');

class Stack {
  constructor(id) {
    this.data = [];
    this.id = id;
  }

  pop() {
    return this.data.pop();
  }

  push(value) {
    this.data.push(value);
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  move(count) {
    const output = [];

    while (count > 0) {
      output.push(this.data.pop());
      count--;
    }

    return output;
  }
}

const formatCrate = (crate) => {
  if (crate) return crate.trim();
  return '';
}

const generateStacks = (crates) => {
  const stacks = [...Array(9).keys()].map((value) => value + 1);
  const rowIdString = [...crates].pop();
  const rowCrateStrings = [...crates].slice(0, -1).reverse();

  return stacks.map((column, index) => {
    const indexOfCrateColumn = rowIdString.indexOf(column.toString());
    const stack = new Stack(column);
    let currentIndex = 0;

    for (const row of rowCrateStrings) {
      const crate = formatCrate(row[indexOfCrateColumn]);
      if (!crate) break;
      stack.push(crate);
    }

    return stack;
  });
}

const formatInstructions = (instructions) => {
  return instructions
    .replace('move ', '')
    .replace(' from ', ',')
    .replace(' to ', ',')
    .split(',')
    .filter((instructions) => instructions !== '')
    .map(Number);
}

fs.readFile('../input.txt', (err, data) => {
  if (err) throw err;
  const input = data.toString().split('\n');

  const crates = input.slice(0, 9);
  const stacks = generateStacks(crates);

  const allInstructions = input
    .slice(10)
    .map(formatInstructions)
    .filter((instructions) => instructions.length > 0);

  allInstructions.forEach(([total, from, to], index) => {
    let count = total;

    const currentStack = stacks[from - 1];
    const stackedCrates = currentStack.move(total);

    while (stackedCrates.length) {
      stacks[to - 1].push(stackedCrates.pop());
    }
  });

  const topOfEachStack = stacks.map((stack) => stack.peek());

  console.log(topOfEachStack.join(''));
});
