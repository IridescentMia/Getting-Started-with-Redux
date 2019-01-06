
import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, setVisibilityFilter } from '../actions';

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

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;