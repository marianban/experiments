// its basically a queue. concatMap will subscribe to first observable but not subscribe to the second until the first completes

import { fromEvent, interval, of } from 'rxjs';
import { concatMap, take, delay } from 'rxjs/operators';

const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

// will maintain only one subscription to the first observable until the first is completed
// first interval subscription completes after 3 values
click$.pipe(concatMap(() => interval$.pipe(take(3)))).subscribe(console.log);

// good for sending client values to server so the next save doesn't completes until the previous completes

const saveAnswer = answer => {
  return of(`Saved: ${answer}`).pipe(delay(1500));
};

const radioButtons = document.querySelectorAll('.radio-option');

const answerChange$ = fromEvent(radioButtons, 'click');

answerChange$
  // this will execute save answer requests in order one by one
  .pipe(concatMap(event => saveAnswer(event.target.value)))
  .subscribe(console.log);
