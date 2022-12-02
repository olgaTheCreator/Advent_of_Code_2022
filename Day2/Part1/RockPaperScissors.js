const fs = require("fs");

const data = fs.readFileSync("../input.txt", "utf8");

const dict = {
  "A Y": 8,
  "B Z": 9,
  "C X": 7,
  "A X": 4,
  "B Y": 5,
  "C Z": 6,
  "A Z": 3,
  "B X": 1,
  "C Y": 2,
};

const arr = data
  .split("\n")
  .map((a) => dict[a])
  .reduce((a, b) => a + b);
console.log(arr);
