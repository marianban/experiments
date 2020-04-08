// it will record the last value but it will emit it to subscribers only when subject$.complete() is called

import { AsyncSubject } from 'rxjs';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

const subject$ = new AsyncSubject();

subject$.subscribe(observer);
subject$.subscribe(observer);

subject$.next('Hello');
subject$.next('World');
subject$.next('Goodbye');

setTimeout(() => {
  // last value is completed only after 2s
  subject$.complete();
}, 2000);
