import { of, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

// of(1, 2, 3, 4, 5)
//   .pipe(map(value => value * 10))
//   .subscribe(console.log);

const keyup$ = fromEvent(document, 'keyup');

const keycode$ = keyup$.pipe(map(event => event.code));

// pluck is shorthand for map (e => e.code)
const keycodeWithPluck$ = keyup$.pipe(pluck('code'));

const pressed$ = keyup$.pipe(mapTo('Key Pressed!'));

pressed$.subscribe(console.log);

document.dispatchEvent(
  new KeyboardEvent('keyup', {
    code: 'KeyS'
  })
);
