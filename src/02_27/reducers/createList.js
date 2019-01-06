import { combineReducers } from "redux";

const createList = (filter) => {
  const handleToggle = (state, action) => {
    const { result: toggleId, entities } = action.response;
    const { completed } = entities.todos[toggleId];

    const shouldRemove = (
      (completed && filter === 'active') ||
      (!completed && filter === 'completed')
    );

    return shouldRemove ? 
      state.filter(id => id !== toggleId) :
      state;
  }

  const ids = (state = [], action) => {  
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return action.filter === filter ? action.response.result : state;
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ?
                  [...state, action.response.result] :
                  state;
      case 'TOGGLE_TODO_SUCCESS':
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
  
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  // A reducer cannot have undefined initial state so I have to make its absence explicit. 
  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_REQUEST':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;