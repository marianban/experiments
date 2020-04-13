import { interval } from 'rxjs';
import { finalize } from 'rxjs/operators';

const counter = document.getElementById('counter');

const sub = interval(1000)
  //.pipe(take(3))
  .pipe(
    finalize(() => {
      // will be invoked for both take or manual unsubscribe and also for error
      // request and displaying loading indicator where we want to dismiss the loading indicator on both error and request completion
      counter.innerHTML = 'Stopped!';
    })
  )
  .subscribe({
    next: (val) => {
      counter.innerHTML = val;
    },
    // complete: () => {
    //   // complete callback is invoked whenever you complete the stream with operator or the stream emits final number of values like of
    //   // However it's not called on unsubscribe
    //   counter.innerHTML = 'Stopped!';
    // },
  });

setTimeout(() => {
  // complete callback won't be called!
  // but the finalize will
  sub.unsubscribe();
}, 3000);
