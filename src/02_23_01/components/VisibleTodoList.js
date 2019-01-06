import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import * as actions from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos, getIsFetching } from '../reducers';

class VisibleTodoList extends Component {
  componentDidMount () {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  };

  render () {
    const { toggleTodo, isFetching, todos } = this.props; 
    if (isFetching && !todos.length) {
      return <p>loading...</p>;
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />
  }
}

const mapStateToTodoListProps = (state, history) => {
  const filter = history.match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;