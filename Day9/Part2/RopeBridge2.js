const console = require("console");
const fs = require("fs");
const data = fs.readFileSync("../test2.txt", "utf8");
const arr = data.split("\n").map((a) => {
  const [direction, distance] = a.split(" ");
  return [direction, parseInt(distance)];
});

const headPositions = [[0, 0]];
const knot1Positions = [[0, 0]];
const tailPositions = [[0, 0]];
let knot2 = [0, 0];
[v, z] = knot2;
let knot3 = [0, 0];
[v, z] = knot3;
let knot4 = [0, 0];
let knot5 = [0, 0];
let knot6 = [0, 0];
let knot7 = [0, 0];
let knot8 = [0, 0];
let tail = [0, 0];
knot4 = [v, z];
knot5 = [v, z];
knot6 = [v, z];
knot7 = [v, z];
knot8 = [v, z];
tail = [v, z];

function newPosition(prevHeadPosition, prevTailPosition, arr) {
  let head = prevHeadPosition;
  [x, y] = head;

  let knot1 = prevTailPosition;
  [v, z] = knot1;
  //

  // console.log(knot1);
  // knot2 = [v, z];
  // console.log(knot2);
  // knot3 = [v, z];
  // knot4 = [v, z];
  // knot5 = [v, z];
  // knot6 = [v, z];
  // knot7 = [v, z];
  // knot8 = [v, z];
  // tail = [v, z];

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
  function countNewTailPos([x, y], [v, z], direction) {
    // console.log([x, y], [v, z]);
    if (
      (v === x || v === x + 1 || v === x - 1) &&
      (y === z || y === z + 1 || y === z - 1)
    ) {
      v = v;
      z = z;
      // console.log("after: ", [x, y], [v, z]);
      return [v, z];
    }

    switch (direction) {
      case "R":
        v === x ? (v += 1) : ((v += 1), (z += 1));
        break;
      case "L":
        v === x ? (v -= 1) : ((v -= 1), (z -= 1));

        break;
      case "U":
        z === y ? (z += 1) : ((z += 1), (v += 1));

        break;
      case "D":
        z === y ? (z -= 1) : ((z -= 1), (v -= 1));
        break;
    }
    // console.log([v, z]);
    console.log("after: ", [x, y], [v, z]);
    return [v, z];
  }
  [...Array(distance).keys()].forEach((_) => {
    console.log(direction);
    head = countNewHeadPos(head, direction);
    headPositions.push(head);
    knot1 = countNewTailPos(head, knot1, direction);
    knot1Positions.push(knot1);
    knot2 = countNewTailPos(knot1, knot2, direction);
    knot3 = countNewTailPos(knot2, knot3, direction);
    knot4 = countNewTailPos(knot3, knot4, direction);
    knot5 = countNewTailPos(knot4, knot5, direction);
    knot6 = countNewTailPos(knot5, knot6, direction);
    knot7 = countNewTailPos(knot6, knot7, direction);
    knot8 = countNewTailPos(knot7, knot8, direction);
    tail = countNewTailPos(knot8, tail, direction);
    tailPositions.push(tail);
  });
}

arr.forEach((a) => {
  console.log(knot3);
  return newPosition(headPositions.at(-1), knot1Positions.at(-1), a);
});

// console.log(headPositions);
// console.log(tailPositions);

//remove duplicates
const uniqueTailPositions = Array.from(
  new Set(tailPositions.map(JSON.stringify)),
  JSON.parse
);

console.log(uniqueTailPositions.length);
