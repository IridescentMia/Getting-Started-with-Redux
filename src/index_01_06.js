import { createStore } from 'redux';
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

const store = createStore(counter);

/**
 * store.getState();
 * store.dispatch(action);
 * store.subsribe(callback);
 */

const render = () => {
  document.body.innerHTML = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});