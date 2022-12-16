const fs = require("fs");
const { createUnparsedSourceFile } = require("typescript");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("\n").map((a) => (a === "noop" ? [a] : a.split(" ")));

const cycles = arr.flatMap((a) =>
  a[0] === "addx"
    ? [
        ["add start", 0],
        ["add end", parseInt(a[1])],
      ]
    : [["noop", 0]]
);

const cyclesGood = cycles.map((a, i) => [a[0], i > 0 ? cycles[i - 1][1] : 1]);

const reducedCycles = [];

cyclesGood.reduce((acc, currVal, i, arr) => {
  const newAcc = [currVal[0], acc[1] + currVal[1]];
  reducedCycles.push(acc);

  if (i === arr.length - 1) {
    reducedCycles.push(newAcc);
  }
  return newAcc;
});

const drawingPixels = reducedCycles.map((a, i) =>
  a[1] === i % 40 || a[1] === (i % 40) - 1 || a[1] === (i % 40) + 1 ? "#" : "."
);
const to40 = drawingPixels.slice(0, 40).join("");
const to80 = drawingPixels.slice(40, 80).join("");
const to120 = drawingPixels.slice(80, 120).join("");
const to160 = drawingPixels.slice(120, 160).join("");
const to200 = drawingPixels.slice(160, 200).join("");
const to240 = drawingPixels.slice(200, 240).join("");

console.log(to40);
console.log(to80);
console.log(to120);
console.log(to160);
console.log(to200);
console.log(to240);
