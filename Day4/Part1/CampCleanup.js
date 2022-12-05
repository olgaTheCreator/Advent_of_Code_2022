const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data
  .split("\n")
  .map((a) => a.split(/[^0-9]/))
  .map((a) => a.map((b) => parseInt(b)))
  .reduce(
    (a, [x, y, z, v]) => a + ((x <= z && y >= v) || (x >= z && y <= v) ? 1 : 0),
    0
  );

console.log(arr);
