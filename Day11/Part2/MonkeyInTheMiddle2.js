const fs = require("fs");
const data = fs.readFileSync("../input.txt", "utf8");

const arr = data.split("\n\n").map((a) => a.split("\n"));

const math_it_up = {
  "+": function (x, y) {
    return x + y;
  },
  "*": function (x, y) {
    return x * y;
  },
};

function createMonkey(monkey_data_arr) {
  const devider = BigInt(parseInt(monkey_data_arr[3].match(/\d+/)[0]));
  const idToPushTrue = BigInt(parseInt(monkey_data_arr[4].match(/\d+/)[0]));
  const idToPushFalse = BigInt(parseInt(monkey_data_arr[5].match(/\d+/)[0]));

  const newItem = monkey_data_arr[2].slice(19).split(" ");

  const op = newItem[1];
  const minusOns = BigInt(-1);
  const v1 = newItem[0] === "old" ? minusOns : BigInt(parseInt(newItem[0]));
  const v2 = newItem[2] === "old" ? minusOns : BigInt(parseInt(newItem[2]));

  const v = (a, n) => (a === minusOns ? n : a);

  const operation = (n) => math_it_up[op](v(v1, n), v(v2, n));

  return {
    monkey_id: BigInt(parseInt(monkey_data_arr[0].match(/\d+/)[0])),
    items: monkey_data_arr[1].match(/\d+/g).map((a) => BigInt(parseInt(a))),
    operation,
    devider,
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

const productOfDividers = arrayOfMonkeys.reduce(
  (a, c) => a * c.devider,
  BigInt(1)
);

function round() {
  arrayOfMonkeys.forEach((element) => {
    element.items.forEach((a) => {
      element.inspected_items.push(a);
      const newWorry = element.operation(a) % productOfDividers;
      arrayOfMonkeys
        .find((b) => b.monkey_id === element.test(newWorry))
        .items.push(newWorry);
    });
    element.items = [];
  });
}

for (let i = 0; i < 10000; i++) {
  round();
}
const sortedLengths = arrayOfMonkeys
  .map((a) => a.inspected_items.length)
  .sort((a, b) => b - a);
answer = BigInt(sortedLengths[0] * sortedLengths[1]);
console.log(answer);
