import expect from 'expect';

const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect(
  counter(1, { type: 'SOMEOTHER' })
).toEqual(1);


expect(
  counter(undefined, { type: 'SOMEOTHER' })
).toEqual(0);

console.log('test passed!');