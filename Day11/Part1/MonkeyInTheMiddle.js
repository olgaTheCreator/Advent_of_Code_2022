const fs = require("fs");
const { evaluate } = require("mathjs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("\n\n").map((a) => a.split("\n"));

function createMonkey(monkey_data_arr) {
  return {
    monkey_id: parseInt(monkey_data_arr[0].match(/\d+/)[0]),
    items: monkey_data_arr[1].match(/\d+/g).map((a) => parseInt(a)),
    operation: function (number) {
      const newItem = evaluate(
        monkey_data_arr[2].match(/old\s.\s\S+/)[0].replaceAll("old", number)
      );

      return newItem;
    },
    test: function (number) {
      if (number % parseInt(monkey_data_arr[3].match(/\d+/)[0]) === 0) {
        return parseInt(monkey_data_arr[4].match(/\d+/)[0]);
      } else {
        return parseInt(monkey_data_arr[5].match(/\d+/)[0]);
      }
    },
    inspected_items: [],
  };
}

const arrayOfMonkeys = arr.map((a) => createMonkey(a));

function round(array) {
  array.forEach((element) => {
    const originalLength = element.items.length;
    element.items.forEach((a) => {
      element.inspected_items.push(a);
      const newWorry = Math.floor(element.operation(a) / 3);

      array
        .find((b) => b.monkey_id === element.test(newWorry))
        .items.push(newWorry);
    });
    element.items = element.items.slice(originalLength);
  });
}

for (let i = 0; i < 20; i++) {
  round(arrayOfMonkeys);
}
const sortedLengths = arrayOfMonkeys
  .map((a) => a.inspected_items.length)
  .sort((a, b) => b - a);
answer = sortedLengths[0] * sortedLengths[1];
console.log(answer);
