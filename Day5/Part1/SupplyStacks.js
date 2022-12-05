const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("\n\n");
[crates, arrangement] = arr;

const arrang = arrangement
  .split("\n")
  .map((a) => a.match(/[0-9]+/g))
  .map((a) => a.map((b) => parseInt(b)));

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

const cra = transpose(
  crates
    .split("\n")
    .slice(0, -1)
    .map((a) => a.replace(/\s/g, "@"))
    .map((a) => a.split(""))
)
  .map((a) => a.filter((b) => b.match(/[A-Z]/)))
  .filter((a) => a.length != 0);

function move(arr, [x, y, z]) {
  for (let i = 1; i <= x; i++) {
    arr[z - 1].unshift(arr[y - 1].shift());
  }
}

for (let i = 0; i < arrang.length; i++) {
  move(cra, arrang[i]);
}

let answer = cra.reduce((a, b) => a + b[0], "");

console.log(answer);
