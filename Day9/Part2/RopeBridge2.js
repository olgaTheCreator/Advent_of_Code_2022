const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");
const arr = data.split("\n").map((a) => {
  const [direction, distance] = a.split(" ");
  return [direction, parseInt(distance)];
});

const headPositions = [[0, 0]];

function newPosition(prevHeadPosition, arr) {
  let head = prevHeadPosition;
  [x, y] = head;

  [direction, distance] = arr;
  function countNewHeadPos([x, y], direction) {
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
    head = countNewHeadPos(head, direction);
    headPositions.push(head);
  });
}

arr.forEach((a) => newPosition(headPositions.at(-1), a));

const knot1 = [[0, 0]];
const knot2 = [[0, 0]];
const knot3 = [[0, 0]];
const knot4 = [[0, 0]];
const knot5 = [[0, 0]];
const knot6 = [[0, 0]];
const knot7 = [[0, 0]];
const knot8 = [[0, 0]];
const tail = [[0, 0]];

function countNewPosition(arr1, arr2) {
  [x, y] = arr1;
  [v, z] = arr2;
  if (
    (v === x || v === x + 1 || v === x - 1) &&
    (y === z || y === z + 1 || y === z - 1)
  ) {
    v = v;
    z = z;

    return [v, z];
  }
  if (v === x) {
    z > y ? (z -= 1) : (z += 1);
  } else if (z === y) {
    v > x ? (v -= 1) : (v += 1);
  } else {
    z > y ? (z -= 1) : (z += 1);
    v > x ? (v -= 1) : (v += 1);
  }
  return [v, z];
}

function createKnotArr(prevArr, currArr) {
  prevArr.forEach((a) => {
    const newPos = countNewPosition(a, currArr.at(-1));
    currArr.push(newPos);
  });
}

createKnotArr(headPositions, knot1);
createKnotArr(knot1, knot2);
createKnotArr(knot2, knot3);
createKnotArr(knot3, knot4);
createKnotArr(knot4, knot5);
createKnotArr(knot5, knot6);
createKnotArr(knot6, knot7);
createKnotArr(knot7, knot8);
createKnotArr(knot8, tail);

//remove duplicates
const uniqueTailPositions = Array.from(
  new Set(tail.map(JSON.stringify)),
  JSON.parse
);

console.log(uniqueTailPositions.length);
