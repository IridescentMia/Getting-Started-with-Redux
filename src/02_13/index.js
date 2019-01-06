import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';
import  { fetchTodos } from './api';

fetchTodos('all').then(todos => {
  console.log(todos);
});

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.querySelector('#root')
);

/**
 * 从api中读取数据
 */