const fs = require("fs");
const data = fs.readFileSync("../test.txt", "utf8");
// console.log(data);
const arr = data.split("\n").map((a) => a.split(""));
console.log(arr);
const visible = [];
const edges = (arr) => {
  visible.push(...arr[0]);
  visible.push(...arr.at(-1));
  console.log(arr.slice(1, arr.length - 1));
  arr.slice(1, arr.length - 1).forEach((a) => visible.push(a[0], a.at(-1)));
};

edges(arr);
console.log(visible);

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}
// console.log(transpose(arr));
// function rangeVertical(size, startAt = 0, element) {
//   return [...Array(size).keys()].map((i) => element[i + startAt]);
// }
// console.log(rangeVertical(5, 0, arr[0]));
for (let i = 1; i < arr.length - 1; i++) {
  //   console.log(arr[i]);
  for (let j = 1; j < arr[i].length - 1; j++) {
    console.log(arr[i][j], i, j);
    // console.log({ value: arr[i][j] });

    // console.log(j, transpose(arr)[i].slice(0, j));
    // console.log(j, transpose(arr)[i].slice(j + 1));

    // console.log(j);
    // console.log({ left: arr[i].slice(0, j) });
    //  console.log({ right: arr[i].slice(j + 1) });
    // console.log(arr[i][j]);
    // console.log(arr[i].slice(0, j).some((a) => a > arr[i][j]));
    if (arr[i].slice(0, j).some((a) => a >= arr[i][j])) {
      //   visible.push(arr[i][j]);
      // console.log({ nothingInTheWay: false });
      if (arr[i].slice(j + 1).some((a) => a >= arr[i][j])) {
        //    console.log({ nothingInTheWay: false });
        //   visible.push(arr[i][j]);
        //   console.log("continue");
        if (
          transpose(arr)
            [i].slice(0, j)
            .some((a) => a >= arr[i][j])
        ) {
          if (
            transpose(arr)
              [i].slice(j + 1)
              .some((a) => a >= arr[i][j])
          ) {
            {
            }
          } else {
            visible.push(arr[i][j]);
            console.log(visible, "down");
          }
        } else {
          visible.push(arr[i][j]);
          console.log(visible, "top");
        }
      } else {
        visible.push(arr[i][j]);
        console.log(visible, "right");
      }
    } else {
      // console.log({ nothingInTheWay: true });
      visible.push(arr[i][j]);
      console.log(visible, "left");
    }
    // console.log({ visible: visible });
    // console.log(rangeVertical(5, 0, arr[i]));
    // console.log([...Array(j).keys()]);
    // else if (Array.from(j, )){}
    // console.log([arr.slice(i + 1).every((a) => a < arr[i])]);
  }
}

console.log(visible.length);
