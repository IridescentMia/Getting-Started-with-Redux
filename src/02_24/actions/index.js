import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'something went wrong'
      });
    }
  );
};
  