const fs = require('fs');

class Node {
  constructor(name) {
    this.name = name;
    this.size = 0;
    this.children = [];
    this.type = null;
    this.parent = null;
  }

  addChild(child) {
    this.children.push(child);
  }

  setSize(size) {
    this.size += size;
  }

  setType(type) {
    this.type = type;
  }

  setParent(parent) {
    this.parent = parent;
  }
}

const isCommand = (line) => line.startsWith('$');

const isDirectory = (line) => line.startsWith('dir');

const isFile = (line) => /^[0-9]/.test(line);

const createChildrenNodes = (currentDirectory, prompts) => {
  for (const line of prompts) {
    if (isDirectory(line)) {
      const [, name] = line.split(' ');
      const directory = new Node(name);

      directory.setParent(currentDirectory);
      directory.setType('directory');
      currentDirectory.addChild(directory);
    }

    if (isFile(line)) {
      const [size, name] = line.split(' ');
      const file = new Node(name);

      file.setParent(currentDirectory);
      file.setType('file');
      file.setSize(parseInt(size));
      currentDirectory.addChild(file);
    }
  }
}

const handleLS = (currentLine, commandPrompt, currentDirectory) => {
  const children = [];
  const start = currentLine + 1;
  let end = start;

  while (commandPrompt[end] && !isCommand(commandPrompt[end])) {
    children.push(commandPrompt[end]);
    end++;
  }

  commandPrompt.splice(start, end - start);
  createChildrenNodes(currentDirectory, children);
}

const isGoingUp = (command) => command.includes('..');
const isGoingDown = (command) => !isGoingUp(command);

const moveUp = (directory) => directory.parent;
const moveDown = (directory, command) => {
  const [, , next] = command.split(' ');

  for (const child of directory.children) {
    if (child.name === next) {
      return child;
    }
  }
}

fs.readFile('../input.txt', (err, data) => {
  const commandPrompt = data.toString().trim().split('\n');

  const headDirectory = commandPrompt.shift().replace('$ cd ', '');
  const head = new Node(headDirectory);
  head.type = 'directory';

  let currentDirectory = head;

  for (let line = 0; line < commandPrompt.length; line++) {
    const command = commandPrompt[line];

    if (command.includes('ls')) {
      handleLS(line, commandPrompt, currentDirectory);
    }

    if (command.includes('cd')) {
      if (isGoingUp(command)) {
        currentDirectory = moveUp(currentDirectory);
        continue;
      }

      if (isGoingDown(command)) {
        currentDirectory = moveDown(currentDirectory, command);
      }
    }
  }

  console.log(head);
});
