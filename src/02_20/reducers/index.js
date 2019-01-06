import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';


const ListByFilter = combineReducers({
  all: createList('all'),
  completed: createList('completed'),
  active: createList('active')
});

const todos = combineReducers({
  byId,
  ListByFilter
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.ListByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};