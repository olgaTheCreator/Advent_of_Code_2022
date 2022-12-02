const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data
  .split("\n\n")
  .map((a) => a.split("\n"))
  .map((a) => a.reduce((b, c) => parseInt(b) + parseInt(c), 0))
  .reduce((a, b) => (a > b ? a : b), 0);

console.log(arr);
