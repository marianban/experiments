import { of, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// of(1, 2, 3, 4, 5)
//   .pipe(filter(value => value > 2))
//   .subscribe(console.log);

const keyup$ = fromEvent(document, 'keyup');
const keycode$ = keyup$.pipe(map(event => event.code));

const enter$ = keycode$.pipe(filter(code => code === 'Enter'));

keycode$.subscribe(console.log);
enter$.subscribe(console.log);

document.dispatchEvent(
  new KeyboardEvent('keyup', {
    code: 'KeyS'
  })
);

document.dispatchEvent(
  new KeyboardEvent('keyup', {
    code: 'Enter'
  })
);
