import { createStore } from 'redux';
import todoApp from './reducers';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: green', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: blue', store.getState());
    console.groupEnd(action.type);

    return returnValue;
  };
};

const addPromiseToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
}

const configureStore = () => {
  
  const store = createStore(todoApp);
  
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseToDispatch(store);

  return store;
}

export default configureStore;