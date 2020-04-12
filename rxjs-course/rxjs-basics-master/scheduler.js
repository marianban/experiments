// let define when work will be executed
// asyncSchedulers.schedule(console.log, 200, 'async') - similar to setTimeout
// asapScheduler - similar to microtask/promise
// animationFrameScheduler - animation frame

import { asyncScheduler, of } from 'rxjs';
import { observeOn, tap, subscribeOn } from 'rxjs/operators';

// of(1, 3, 3, asyncScheduler).subscribe()

// interval(20).pipe(observeOn(animationFrameScheduler)).subscribe()

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

// this is equivalent to wrapping console to setTimeout
// asyncScheduler.schedule(() => console.log('Hello World!'));
// const sub = asyncScheduler.schedule(console.log, 2000, 'Hello World!');

// console.log('sync');
// sub.unsubscribe(); // second hello world is not logged

// of(4, 5, 6, asyncScheduler).subscribe(observer);
// same behaviour as before
// of(7, 8, 9)
//   .pipe(
//     tap((val) => console.log('from tap', val)),
//     // use delay for this! this is only an example
//     observeOn(asyncScheduler, 3000)
//   )
//   .subscribe(observer);
// this will be synchronous
of(1, 2, 3).subscribe(observer);

of(7, 8, 9)
  .pipe(
    tap((val) => console.log('from tap', val)),
    // same as wrapping entire subscribe to setTimeout
    subscribeOn(asyncScheduler, 3000)
  )
  .subscribe(observer);
