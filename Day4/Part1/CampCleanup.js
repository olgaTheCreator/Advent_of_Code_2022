const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

let pairs = 0;

const arr = data
  .split("\n")
  .map((a) => a.split(/[^0-9]/))
  .map((a) => a.map((b) => parseInt(b)))
  .forEach(([x, y, z, v]) => {
    if ((x <= z && y >= v) || (x >= z && y <= v)) {
      pairs++;
    }
  });

console.log(pairs);
