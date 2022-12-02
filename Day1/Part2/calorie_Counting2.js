const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data
  .split("\n\n")
  .map((a) => a.split("\n"))
  .map((a) => a.reduce((b, c) => parseInt(b) + parseInt(c), 0))
  .sort((a, b) => b - a);

const answer = arr[0] + arr[1] + arr[2];

console.log(answer);
