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
 * 简化 mapDispatchToTodoListProps
 * When the arguments for the callback prop match the arguments to the action creator exactly, there is a shorter way to specify mapDispatchToProps.
 */