// subscribes to all provided observables
// emits the last emitted value from each observable after those observables completed
import { of, forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const numbers$ = of(1, 2, 3);
const letters$ = of('a', 'b', 'c');

forkJoin(numbers$, letters$.pipe(delay(3000))).subscribe(console.log);

// it can also emit objects
forkJoin({ numbers: numbers$, letters: letters$.pipe(delay(3000)) }).subscribe(
  console.log
);

const GITHUB_API_BASE = 'https://api.github.com';
// good for creating observable for multiple ajax requests, similar to Promise.All
forkJoin({
  user: ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex`),
  repo: ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex/repos`),
}).subscribe(console.log);
