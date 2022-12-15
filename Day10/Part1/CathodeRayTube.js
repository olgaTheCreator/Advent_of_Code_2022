const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("\n").map((a) => (a === "noop" ? [a] : a.split(" ")));
console.log(arr);
// const cycles = arr.map((a, i) => (a[0] === "addx" ? (a = arr[i - 1]) : a));

const cycles = arr.map((a) =>
  a[0] === "addx"
    ? { cycle: 2, value: parseInt(a[1]), a }
    : { cycle: 1, value: 0, a }
);

const reducedCycles = [];
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

console.log(JSON.stringify(reducedCycles, null, 4));
// const chosenCycles = reducedCycles.filter(
//   (a) =>
//     a.cycle === 19 ||
//     a.cycle === 20 ||
//     a.cycle === 59 ||
//     a.cycle === 60 ||
//     a.cycle === 99 ||
//     a.cycle === 100 ||
//     a.cycle === 139 ||
//     a.cycle === 140 ||
//     a.cycle === 179 ||
//     a.cycle === 180 ||
//     a.cycle === 219 ||
//     a.cycle === 220
// );
// console.log(chosenCycles);

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
  // .reduce((a, b) => a + b)
);

console.log(reducedCycles.find((a) => a.cycle === 220));
function chosenCycles(array, arrOfNum) {
  const multiplications = arrOfNum.map((a) => {
    array.find((b) => b.cycle === a - 1) === undefined
      ? array.find((b) => b.cycle === a - 2)
      : array.find((b) => b.cycle === a - 1);
  });
  return multiplications;
}

const multiArray = chosenCycles(reducedCycles, [20, 60, 100, 140, 180, 220]);
// console.log(multiArray);
