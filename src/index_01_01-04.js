/**
 * The first principle of Redux:
 * whether your app is a really simple one like this counter example, or a complex application with a lot of UI, and change of state, you are going to represent the whole state of your application as 
 * a single JavaScript object
 * 
 * The second principle of Redux:
 * the state tree is read only
 * 
 * The third principle of Redux:
 * To describe state mutations, you have to write a function that takes the previous state of the app, the action being dispatched, and returns the next state of the app.
 * This function has to be pure. This function is called the Reducer.
 */

 /**
  * Pure functions:
  * do not have any observable side effects, such as network or database calls.
  * The pure functions just calculate the new value. You can be confident that if you call the pure function with the same set of arguments, you're going to get the same returned value. They are predictable.
  */
