const fs = require("fs");
const data = fs.readFileSync("../test.txt", "utf8");
const arr = data.split("\n").map((a) => {
  const [direction, distance] = a.split(" ");
  //   const obj = {splited[0]: ""}
  //   console.log(splited);
  return [direction, parseInt(distance)];
});

// const maxR = arr.reduce((a, [dir, dis]) => a + (dir === "R" ? dis : 0), 0)
// ;
// const maxL
// console.log(maxHor);
console.log(arr);
const headPositions = [[0, 0]];
const tailPositions = [[0, 0]];

function newPosition(prevPosition, arr) {
  let position = prevPosition;
  [x, y] = position;

  [direction, distance] = arr;
  function countNewPos([x, y], direction) {
    switch (direction) {
      case "R":
        x += 1;
        break;
      case "L":
        x -= 1;
        break;
      case "U":
        y += 1;
        break;
      case "D":
        y -= 1;
        break;
    }
    return [x, y];
  }

  [...Array(distance).keys()].forEach((_) => {
    position = countNewPos(position, direction);
    headPositions.push(position);
  });
}
arr.forEach((a) => newPosition(headPositions.at(-1), a));
// console.log(headPositions);
function generateTailPos(arr1, arr2) {
  let position = arr2;
  //   [hX, hY] = arr1;
  [tX, tY] = position;

  function countTailPos([hX, hY], [tX, tY]) {
    if (hX === tX) {
      hY === tY + 1 ? (tY += 1) : hY === tY - 1 ? (tY -= 1) : {};
    } else if (hY === tY) {
      //   console.log("hey");
      hX === tX + 1 ? (tX += 1) : hX === tX - 1 ? (tX += 1) : {};
    }
    // console.log([tX, tY]);
    return [tX, tY];
  }

  arr1.forEach(([hX, hY]) => {
    // console.log(hX, hY, tX, tY);
    position = countTailPos([hX, hY], position);

    tailPositions.push(position);
  });
}
generateTailPos(headPositions, tailPositions.at(-1));
console.log(headPositions);
console.log(tailPositions);
