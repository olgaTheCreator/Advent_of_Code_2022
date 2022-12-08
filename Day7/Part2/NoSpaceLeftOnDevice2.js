const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("\n");
const createDir = (parent, dirName) => ({ parent, dirName, children: [] });
const createFile = (parent, fileName, size) => ({ parent, fileName, size });
const currentDirTree = [];
const pathToCurrent = [];
const root = createDir(undefined, "/");

function countSize(node) {
  if (!node) {
    return node;
  }

  if (node.children?.every((a) => a.hasOwnProperty("size"))) {
    node.size = node.children?.reduce((a, b) => a + b.size, 0);
  } else {
    node.children?.map((childNode) => countSize(childNode));
  }
  return { ...node };
}
const sizesArray = [];

function createSizesArray(obj) {
  if (obj.hasOwnProperty("dirName")) {
    sizesArray.push(obj.size);
  }
  if (!obj.children) {
    return;
  }
  obj.children.forEach((child) => {
    return createSizesArray(child);
  });
}

for (line of arr) {
  const parent = pathToCurrent.at(-1);
  if (/\$\scd\s(\w+|\/)/.test(line)) {
    const name = line.match(/(?<=\$\scd\s)(\w+|\/)/)[0];
    const newDir = createDir(currentDirTree[currentDirTree.length - 1], name);
    currentDirTree.push(name);
    parent?.children.push(newDir);
    pathToCurrent.push(newDir);
  }

  if (/\$\scd\s\.\./.test(line)) {
    currentDirTree.pop();
    pathToCurrent.pop();
  }

  if (/\d+\s\w+/.test(line)) {
    const name = line.match(/(?<=\d+\s)\w+/)[0];
    const size = parseInt(line.match(/\d+(?=\s\w+)/)[0]);
    const newFile = createFile(
      currentDirTree[currentDirTree.length - 1],
      name,
      size
    );
    parent?.children.push(newFile);
  }
}

let tree = pathToCurrent[0];
while (!tree.hasOwnProperty("size")) {
  tree = countSize(tree);
}
createSizesArray(tree);

const filtered = sizesArray.filter((a) => a <= 100000);

console.log(filtered.reduce((acc, b) => acc + b));

console.log(sizesArray);
const sorted = sizesArray.sort((a, b) => b - a);

// console.log(sorted);
// // sorted.filter(a => )
// sorted.forEach((a) => console.log(70000000 - sorted[0] + a));
console.log(sorted.filter((a) => 70000000 - sorted[0] + a > 30000000).at(-1));
