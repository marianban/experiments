import { queueScheduler } from 'rxjs';

// queueScheduler will execute tasks synchronously in a queue
// good for influencing of order of execution of nested tasks
queueScheduler.schedule(() => {
  queueScheduler.schedule(() => {
    console.log('inner queue');
  });
  // this will run first
  console.log('first queue');
});

console.log('sync');
