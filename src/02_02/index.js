import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import todoApp from './reducers';

// --------------- action creators ----------------
let nextTodoId = 0;
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

const setVisibilityFilter = (filter) => ( {
  type: 'SET_VISIBILITY_FILTER',
  filter
});

// -----------------------------------------------

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
  }
};

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => { input = node }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>ADD TODO</button>
    </div>
  )
};
AddTodo = connect()(AddTodo);

const Todo = ({
  text,
  completed,
  onClick
}) => (
  <li onClick={onClick}
      style={{
        textDecoration:
          completed ? 'line-through' : 'none'
      }}>
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo => 
      <Todo
        key={todo.id}
        onClick={() => onTodoClick(todo.id)}
        {...todo}
      />
    )}
  </ul>
);

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id))
  }
});
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href="#" onClick={(e) => {
      e.preventDefault();
      onClick();
    }}>
      {children}
    </a>
  )
};

const mapStateToLinkProps = (state, ownProps) => ({
  active: state.visibilityFilter === ownProps.filter
});
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
});
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter={'SHOW_ALL'}
    >all</FilterLink>
    {' '}
    <FilterLink
      filter={'SHOW_COMPLETED'}
    >completed</FilterLink>
    {' '}
    <FilterLink
      filter={'SHOW_ACTIVE'}
    >active</FilterLink>
  </p>
);

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

const persistedState = {
  todos: [{
    id: 0,
    text: 'test',
    completed: false
  }]
};
const store = createStore(
  todoApp,
  persistedState
);

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.querySelector('#root')
);

/**
 * persistedState
 */