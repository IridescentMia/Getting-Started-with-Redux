import { v4 } from 'node-uuid';

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'AAA',
    completed: false
  }, {
    id: v4(),
    text: 'BBB',
    completed: true
  }, {
    id: v4(),
    text: 'CCC',
    completed: false
  }, {
    id: v4(),
    text: 'DDD',
    completed: true
  }]
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'completed':
        return fakeDatabase.todos.filter(todo => todo.completed);
      case 'active':
        return fakeDatabase.todos.filter(todo => !todo.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`)
    }
  });

export const addTodo = (text) => 
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toggleTodo = (id) =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    return todo;
  });