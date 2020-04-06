import { interval, timer } from 'rxjs';

// timer is similar to interval but we can
// specify time after which the first value is emitted (interval will emit first value after 1s)
const timer$ = timer(0, 1000);
// this will start emitting after 2s
//  const timer$ = timer(2000, 1000);

timer$.subscribe(console.log);
