import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';
import  { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount () {
    fetchTodos(this.props.filter).then(todos => {
      console.log(todos);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      fetchTodos(this.props.filter).then(todos => {
        console.log(todos);
      });
    }
  }

  render () {
    return <TodoList {...this.props} />
  }
}

const mapStateToTodoListProps = (state, history) => {
  const filter = history.match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  { onTodoClick: toggleTodo }
)(VisibleTodoList));


export default VisibleTodoList;