const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("\n").map((a) => (a === "noop" ? [a] : a.split(" ")));
console.log(arr);

const cycles = arr.map((a) =>
  a[0] === "addx"
    ? { cycle: 2, value: parseInt(a[1]), a }
    : { cycle: 1, value: 0, a }
);

const reducedCycles = [];

//scan
cycles.reduce(
  (acc, currVal) => {
    const newAcc = {
      cycle: acc.cycle + currVal.cycle,
      value: acc.value + currVal.value,
      a: currVal,
    };
    reducedCycles.push(acc);
    return newAcc;
  },
  { cycle: 0, value: 1 }
);

console.log(
  [20, 60, 100, 140, 180, 220]
    .map((a) => {
      const preciseCycle = reducedCycles.find((b) => b.cycle === a - 1);
      const oneLessCycle = reducedCycles.find((b) => b.cycle === a - 2);
      return preciseCycle !== undefined
        ? a * preciseCycle.value
        : a * oneLessCycle.value;
    })
    .reduce((a, b) => a + b)
);
