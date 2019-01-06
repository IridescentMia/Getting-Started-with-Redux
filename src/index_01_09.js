import expect from 'expect';
import deepFreeze from 'deep-freeze';

// const addCounter = (list) => {
//   list.push(0);
//   return list;
// };

// const addCounter = (list) => {
//   return list.concat(0);
// };

const addCounter = (list) => {
  return [...list, 0];
};

// const removeCounter = (list, index) => {
//   list.splice(index, 1);
//   return list;
// };

// const removeCounter = (list, index) => {
//   return list
//     .slice(0, index)
//     .concat(list.slice(index + 1));
// };

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)  
  ];
};

// const increaseCounter = (list, index) => {
//   list[index]++;
//   return list;
// };

// const increaseCounter = (list, index) => {
//   return list
//     .slice(0, index)
//     .concat(list[index] + 1)
//     .concat(list.slice(index + 1));
// };

const increaseCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [9, 10, 200];
  const listAfter = [9, 200];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};

const testIncreaseCounter = () => {
  const listBefore = [9, 10, 200];
  const listAfter = [9, 11, 200];

  deepFreeze(listBefore);

  expect(
    increaseCounter(listBefore, 1)
  ).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncreaseCounter();
console.log('All tests passed.');

/**
 *  Avoiding Array Mutations with concat(), slice(), and ...spread
 */