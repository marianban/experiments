import { ObservableStore } from './store';

// Task: An event triggering a callback.
//       Executed when a new event loop iteration begins.
//       Enqueue a new task by setTimeout() or setInterval().
setTimeout(() => console.log('task'));

// AnimationFrame: Executed before the next repaint.
//                 Enqueue a new animation by requestAnimationFrame.
requestAnimationFrame(() => console.log('animation'));

// Microtask: A promise.
//            Executed before the end of the event loop iteration.
//            Enqueue a new microtask by queueMicrotask().
queueMicrotask(() => console.log('microtask'));

// Synchronous code.
// Executed on the current call stack before any other task.
console.log('sync code');

// 🚀 CONSOLE OUTPUT:
// sync code
// microtask
// animation
// task

const store = new ObservableStore({
  user: 'brian',
  isAuthenticated: false,
});

store.selectState('user').subscribe(console.log);

store.updateState({
  user: 'joe',
});

// this will not log nothing because we are not subscribed to the state slice
store.updateState({
  isAuthenticated: true,
});
