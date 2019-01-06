import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import PropTypes from 'prop-types';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default: 
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

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

let nextTodoId = 0;
const AddTodo = (props, { store }) => {
  let input;

  return (
    <div>
      <input ref={node => { input = node }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        });
        input.value = '';
      }}>ADD TODO</button>
    </div>
  )
};
AddTodo.contextTypes = {
  store: PropTypes.object
};

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

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }}
      ></TodoList>
    )
  }
}
VisibleTodoList.contextTypes = {
  store: PropTypes.object
};

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

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    return (
      <Link
        active={state.visibilityFilter === props.filter}
        onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }}
      >
        {props.children}
      </Link>
    );
  }
}
FilterLink.contextTypes = {
  store: PropTypes.object
};

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

class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }
}
Provider.childContextTypes = {
  store: PropTypes.object
};

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.querySelector('#root')
);

/**
 * 1. 访问全局变量 store
 * 2. 从根节点把 store 传到叶子节点，一级一级的传（一些不用 store 的中间节点不得不接收，然后再传下去）
 * 3. Provider 包裹在 TodoApp 外部，使 TodoApp 内部节点可以直接从 context 上获取 store，相当于另一种形式的全局变量
 */

 /**
  * Provider: 
  * getChildContext() {}
  * Provider.childContextTypes={}
  * 
  * Child:
  * Child.contextTypes={}
  */