import { of, fromEvent } from 'rxjs';
import { take, map, first } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);
const click$ = fromEvent(document, 'click');

click$
  .pipe(
    map(event => ({
      x: event.clientX,
      y: event.clientY
    })),
    // take(1) // completes after first
    first(({ x }) => x >= 20) // completes if condition is met
    // first == (filter, take(1))
  )
  .subscribe({
    next: console.log,
    complete: () => console.log('completed')
  });

document.dispatchEvent(
  new MouseEvent('click', {
    clientX: 10,
    clientY: 20
  })
);

// completes
document.dispatchEvent(
  new MouseEvent('click', {
    clientX: 30,
    clientY: 40
  })
);
