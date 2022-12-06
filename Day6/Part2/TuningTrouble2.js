const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("");
const indexOfElement =
  arr.findIndex((_, i) => {
    const slice = arr.slice(i, i + 14);
    return slice.length === [...new Set(slice)].length;
  }) + 14;

console.log(indexOfElement);
