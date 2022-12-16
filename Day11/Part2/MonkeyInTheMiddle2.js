const fs = require("fs");
const { evaluate } = require("mathjs");
const data = fs.readFileSync("../test.txt", "utf8");

const arr = data.split("\n\n").map((a) => a.split("\n"));

console.log(data);

function createMonkey(monkey_data_arr) {
  const devider = BigInt(parseInt(monkey_data_arr[3].match(/\d+/)[0]));
  const idToPushTrue = BigInt(parseInt(monkey_data_arr[4].match(/\d+/)[0]));
  const idToPushFalse = BigInt(parseInt(monkey_data_arr[5].match(/\d+/)[0]));

  function parse(str) {
    return Function(`'use strict'; return (${str})`)();
  }

  return {
    monkey_id: BigInt(parseInt(monkey_data_arr[0].match(/\d+/)[0])),
    items: monkey_data_arr[1].match(/\d+/g).map((a) => BigInt(parseInt(a))),
    operation: function (number) {
      const newItem = monkey_data_arr[2];

      //.replaceAll("old", BigInt(number));

      console.log(number, newItem);
      return newItem;
    },
    test: function (number) {
      if (number % devider == 0) {
        return idToPushTrue;
      } else {
        return idToPushFalse;
      }
    },
    inspected_items: [],
  };
}

const arrayOfMonkeys = arr.map((a) => createMonkey(a));
console.log(arrayOfMonkeys);

function round(array) {
  array.forEach((element) => {
    element.items.forEach((a) => {
      element.inspected_items.push(a);
      const newWorry = element.operation(a);
      // // console.log(element.test(newWorry));
      // array
      //   .find((b) => b.monkey_id === element.test(newWorry))
      //   .items.push(newWorry);
    });
    element.items = [];
  });
}
// round(arrayOfMonkeys);
// console.log(arrayOfMonkeys);
for (let i = 0; i < 20; i++) {
  round(arrayOfMonkeys);
  // console.log(arrayOfMonkeys);
}
arrayOfMonkeys.forEach((a) => console.log(a.inspected_items.length));
// const sortedLengths = arrayOfMonkeys
//   .map((a) => a.inspected_items.length)
//   .sort((a, b) => b - a);
// answer = sortedLengths[0] * sortedLengths[1];
// console.log(answer);
