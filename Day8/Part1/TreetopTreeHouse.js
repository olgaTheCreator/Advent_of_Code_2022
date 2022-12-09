const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");
const arr = data.split("\n").map((a) => a.split(""));

const visible = [];
const edges = (arr) => {
  visible.push(...arr[0]);
  visible.push(...arr.at(-1));
  arr.slice(1, arr.length - 1).forEach((a) => visible.push(a[0], a.at(-1)));
};

edges(arr);

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

for (let i = 1; i < arr.length - 1; i++) {
  for (let j = 1; j < arr[i].length - 1; j++) {
    //left
    if (arr[i].slice(0, j).some((a) => a >= arr[i][j])) {
      //right
      if (arr[i].slice(j + 1).some((a) => a >= arr[i][j])) {
        //top
        if (
          transpose(arr)
            [j].slice(0, i)
            .some((a) => a >= arr[i][j])
        ) {
          //bottom
          if (
            transpose(arr)
              [j].slice(i + 1)
              .every((a) => a < arr[i][j])
          ) {
            visible.push(arr[i][j]);
            // (visible, "down");
          }
        } else {
          visible.push(arr[i][j]);
          //   (visible, "top");
        }
      } else {
        visible.push(arr[i][j]);
        // (visible, "right");
      }
    } else {
      visible.push(arr[i][j]);
      //   (visible, "left");
    }
  }
}

console.log(visible.length);
