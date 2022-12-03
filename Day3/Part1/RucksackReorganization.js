const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data
  .split("\n")
  .map((a) => a.split(""))
  .map((a) => [a.slice(0, a.length / 2), a.slice(a.length / 2)])
  .map((a) => a[0].find((b) => a[1].includes(b)))
  .map((a) => a.charCodeAt(0))
  .map((a) => (a > 96 ? a - 96 : a - 38))
  .reduce((a, b) => a + b);

console.log(arr);
