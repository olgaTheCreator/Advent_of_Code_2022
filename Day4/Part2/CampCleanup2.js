const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data
  .split("\n")
  .map((a) => a.split(/[^0-9]/))
  .map((a) => a.map((b) => parseInt(b)));

let pairs = arr.length;

const newArr = arr.forEach(([x, y, z, v]) => {
  if (y < z || v < x) {
    pairs--;
  }
});

console.log(pairs);
