const fs = require("fs");

const data = fs.readFileSync("../input.txt", "utf8");

const dict = {
  "A Y": 4,
  "B Z": 9,
  "C X": 2,
  "A X": 3,
  "B Y": 5,
  "C Z": 7,
  "A Z": 8,
  "B X": 1,
  "C Y": 6,
};

const arr = data
  .split("\n")
  .map((a) => dict[a])
  .reduce((a, b) => a + b);
console.log(arr);
