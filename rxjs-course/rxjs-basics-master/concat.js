import { interval, empty } from 'rxjs';
import { take, concat, startWith, delay } from 'rxjs/operators';

const intervals$ = interval(1000);
// this observable will complete after one second
const delayed$ = empty().pipe(delay(1000));

// the second interval will start emitting values only after the first interval completed
// use if execute observables in order
// concat(intervals$.pipe(take(3)), intervals$.pipe(take(2))).subscribe(
//   console.log
// );

// can be used also for activating an observable based on the completion on the previous observable

delayed$
  .pipe(
    concat(
      delayed$.pipe(startWith('3...')),
      delayed$.pipe(startWith('2...')),
      delayed$.pipe(startWith('1...')),
      delayed$.pipe(startWith('Go!'))
    ),
    startWith('Get Ready')
  )
  .subscribe(console.log);

// can be used also for interesting animations / ui orchestration
