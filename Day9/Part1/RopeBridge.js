const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");
const arr = data.split("\n").map((a) => {
  const [direction, distance] = a.split(" ");
  return [direction, parseInt(distance)];
});

const headPositions = [[0, 0]];
const tailPositions = [[0, 0]];

function newPosition(prevHeadPosition, prevTailPosition, arr) {
  let head = prevHeadPosition;
  [x, y] = head;
  let tail = prevTailPosition;
  [v, z] = tail;

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
    if (
      (v === x || v === x + 1 || v === x - 1) &&
      (y === z || y === z + 1 || y === z - 1)
    ) {
      v = v;
      z = z;
      return [v, z];
    }

    switch (direction) {
      case "R":
        v === x ? (v += 1) : ((v += 1), (z = y));
        break;
      case "L":
        v === x ? (v -= 1) : ((v -= 1), (z = y));

        break;
      case "U":
        z === y ? (z += 1) : ((z += 1), (v = x));

        break;
      case "D":
        z === y ? (z -= 1) : ((z -= 1), (v = x));
        break;
    }

    return [v, z];
  }
  [...Array(distance).keys()].forEach((_) => {
    head = countNewHeadPos(head, direction);
    headPositions.push(head);
    tail = countNewTailPos(head, tail, direction);
    tailPositions.push(tail);
  });
}

arr.forEach((a) => newPosition(headPositions.at(-1), tailPositions.at(-1), a));

//remove duplicates
const uniqueTailPositions = Array.from(
  new Set(tailPositions.map(JSON.stringify)),
  JSON.parse
);

console.log(uniqueTailPositions.length);
