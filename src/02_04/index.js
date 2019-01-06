import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.querySelector('#root')
);

/**
 * 提取出store相关操作到configureStore
 * 引入Root组件
 */