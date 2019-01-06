// import { createStore } from 'redux';
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

// ================================
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return {
    getState, dispatch, subscribe
  }
};
// ================================

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