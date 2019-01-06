import React from 'react';
import ReactDom from 'react-dom';
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

const Counter = ({
  value,
  onDecrement,
  onIncrement
}) => (
  <div>
    <h3>{value}</h3>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)
const render = () => {
  ReactDom.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.querySelector('#root')
  )
};

store.subscribe(render);
render();