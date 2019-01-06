import { connect } from 'react-redux';
import TodoList from './TodoList';
import { addTodo, toggleTodo } from '../actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'active':
      return todos.filter(todo => !todo.completed);
  }
};

const mapStateToTodoListProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter)
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


export default VisibleTodoList;