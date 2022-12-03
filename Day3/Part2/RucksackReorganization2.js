const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("\n");
const newArr = [];

for (let i = 0; i < arr.length; i = i + 3) {
  newArr.push(arr.slice(i, i + 3));
}

const newestArr = newArr
  .map((a) => a.map((b) => b.split("")))
  .map(([a, b, c]) => a.find((x) => b.filter((v) => c.includes(v)).includes(x)))
  .map((a) => a.charCodeAt(0))
  .map((a) => (a > 96 ? a - 96 : a - 38))
  .reduce((a, b) => a + b);

console.log(newestArr);
