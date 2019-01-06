import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions';
import { withRouter } from 'react-router';

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

const mapStateToTodoListProps = (state, history) => ({
  todos: getVisibleTodos(state.todos, history.match.params.filter || 'all')
});
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id))
  }
});
const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList));


export default VisibleTodoList;