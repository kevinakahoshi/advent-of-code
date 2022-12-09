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

const handleChangeDirectory = (command, currentDirectory) => {
  if (isGoingUp(command)) return moveUp(currentDirectory);
  if (isGoingDown(command)) return moveDown(currentDirectory, command);
}

const buildTree = (head, commandPrompt) => {
  let currentDirectory = head;

  for (let line = 0; line < commandPrompt.length; line++) {
    const command = commandPrompt[line];

    if (command.includes('ls')) {
      handleLS(line, commandPrompt, currentDirectory);
    }

    if (command.includes('cd')) {
      currentDirectory = handleChangeDirectory(command, currentDirectory);
    }
  }
}

const calculateSizes = (node) => {
  if (!node) return 0;

  let total = 0;

  for (const child of node.children) {
    if (child.type === 'file') {
      total += child.size;
    } else {
      const dirSize = calculateSizes(child);
      child.setSize(dirSize);
      total += child.size;
    }
  }

  return total;
}

const findAllDirectories = (head) => {
  const directories = [];

  const traverse = (node) => {
    if (node.type === 'file') return;
    directories.push(node);
    node.children.forEach((child) => traverse(child));
  }

  traverse(head);

  return directories;
}

fs.readFile('../input.txt', (err, data) => {
  const commandPrompt = data.toString().trim().split('\n');

  const headDirectory = commandPrompt.shift().replace('$ cd ', '');
  const head = new Node(headDirectory);
  head.setType('directory');

  buildTree(head, commandPrompt);

  const size = calculateSizes(head);
  head.setSize(size);

  const allDirectories = findAllDirectories(head);
  const directoriesBySize = [...allDirectories.sort((dir1, dir2) => dir1.size - dir2.size)];

  const fileSystemSize = 70000000;
  const minimumRequired = 30000000;
  const availableSpace = fileSystemSize - head.size;
  const additionalSpaceRequired = minimumRequired - availableSpace;

  for (const directory of directoriesBySize) {
    const {
      name,
      size
    } = directory;
    if (size > additionalSpaceRequired) {
      console.table({
        name,
        size
      });
      break;
    }
  }
});
