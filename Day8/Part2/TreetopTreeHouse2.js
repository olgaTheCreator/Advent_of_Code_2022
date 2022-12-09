const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");
const arr = data.split("\n").map((a) => a.split(""));

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

const scenicScoresArr = [];
for (let i = 1; i < arr.length - 1; i++) {
  for (let j = 1; j < arr[i].length - 1; j++) {
    const left = arr[i]
      .slice(0, j)
      .reverse()
      .findIndex((a) => a >= arr[i][j]);
    const leftScenic = left === -1 ? j : left + 1;

    const right = arr[i].slice(j + 1).findIndex((a) => a >= arr[i][j]);
    const rightScenic = right === -1 ? arr[i].slice(j + 1).length : right + 1;

    const top = transpose(arr)
      [j].slice(0, i)
      .reverse()
      .findIndex((a) => a >= arr[i][j]);
    const topScenic = top === -1 ? i : top + 1;

    const bottom = transpose(arr)
      [j].slice(i + 1)
      .findIndex((a) => a >= arr[i][j]);
    const bottomScenic =
      bottom === -1 ? transpose(arr)[j].slice(i + 1).length : bottom + 1;

    scenicScoresArr.push(leftScenic * rightScenic * topScenic * bottomScenic);
  }
}
const result = scenicScoresArr.reduce((a, b) => (a >= b ? a : b));
console.log(result);
