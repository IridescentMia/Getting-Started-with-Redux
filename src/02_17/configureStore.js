import { createStore } from 'redux';
import todoApp from './reducers';

const logger = (store) => {
  return (next) => {
    if (!console.group) {
      return next;
    }
  
    return (action) => {
      console.group(action.type);
      console.log('%c prev state', 'color: gray', store.getState());
      console.log('%c action', 'color: green', action);
      const returnValue = next(action);
      console.log('%c next state', 'color: blue', store.getState());
      console.groupEnd(action.type);
  
      return returnValue;
    };
  };
};

const promise = (store) => {
  return (next) => {
    return (action) => {
      if (typeof action.then === 'function') {
        return action.then(next);
      }
      return next(action);
    };
  };
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => 
    store.dispatch = middleware(store)(store.dispatch)
  );
};

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise];
  
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
}

export default configureStore;