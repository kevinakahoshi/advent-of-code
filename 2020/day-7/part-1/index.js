const fs = require('fs');

const bagRegEx = new RegExp(/(bag)(s\b|\b)/);

const transformRuleString = (rule) => {
  const ruleSplit = rule.split('contain');
  const bag = ruleSplit[0].replace(bagRegEx, '').trim();
  const contents = ruleSplit[1].split(',').map((innerContent) =>  {
    innerContent = innerContent.replace('.', '').trim();
    if (innerContent.includes('other')) return innerContent;
    return innerContent.replace(bagRegEx, '').slice(2).trim();
  });
  const output = {
    [bag]: contents
  };
  return output;
}

// const removeEmptyBags = (bag) => {
//   const contents = [...Object.values(bag)[0]];
//   if (!contents.includes(' other')) return bag;
// }

const createMasterHashMap = (filteredBagList) => {
  const output = {};
  filteredBagList.forEach((bag) => {
    const bagType = Object.keys(bag)[0];
    const bagContents = bag[bagType];
    if (output[bagType]) {
      throw new Error('There is already a bag with this name');
    } else {
      output[bagType] = bagContents;
    }
  });
  return output;
}

const traverseBags = (root, list, count) => {
  if (!root || !list[root]) return count;
  if (root === 'shiny gold') {
    return count + 1;
  } else {
    list[root].forEach((bagName) => {
      if (bagName === 'shiny gold') {
        console.log('It worked');
        traverseBags(bagName, list, count + 1);
      } else {
        traverseBags(bagName, list, count);
      }
    });
    return count;
  }
}

fs.readFile('../data.txt', (err, data) => {
  if (err) throw err;
  const input = data.toString().trim().split('\n');
  const inputKeyValues = input.map(transformRuleString);
  // const filteredValues = inputKeyValues.filter(removeEmptyBags);
  const masterHashMap = createMasterHashMap(inputKeyValues);

  let output = 0;

  for (const key in masterHashMap) {
    const value = traverseBags(key, masterHashMap, 0);
    console.log(value);
  }

  console.log(output);

  // const output = traverseBags(Object.keys(masterHashMap)[0], masterHashMap, 0);

  fs.writeFile('master-hash.json', JSON.stringify(masterHashMap, null, 2), (err) => {
    if (err) throw err;
    // console.log('master-hash.json written successfully');
  })

  fs.writeFile('input-key-value.json', JSON.stringify(inputKeyValues, null, 2), (err) => {
    if (err) throw err;
    console.log('input-key-value.json written successfully');
  });

  // fs.writeFile('filtered-values.json', JSON.stringify(filteredValues, null, 2), (err) => {
  //   if (err) throw err;
  //   console.log('filtered-values.json written successfully');
  // })
})
