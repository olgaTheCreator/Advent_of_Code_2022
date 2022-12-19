const fs = require("fs");
const data = fs.readFileSync("../test.txt", "utf8");

const lineLength = data.split("\n")[0].length;
console.log(lineLength);
const arr = data.split("").filter((a) => a !== "\n");
console.log(arr);

const rows = arr.length / lineLength;
console.log(rows);

function neighbours(letter) {
  const i = 0;
  const neigbours = [];
}
// for (let i=0;i<arr.length;i++) {
//     const row = arr[i]
//     for (let j=0;j<row.length;j++) {
//         if

//     }
// }
