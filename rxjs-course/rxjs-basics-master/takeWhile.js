import { fromEvent } from 'rxjs';
import { take, map, takeWhile } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(
    map(event => ({
      x: event.clientX,
      y: event.clientY
    })),
    takeWhile(({ y }) => y <= 200)
    // takeWhile(({ y }) => y <= 200, true) returns also 2000
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

document.dispatchEvent(
  new MouseEvent('click', {
    clientX: 10,
    clientY: 20
  })
);

document.dispatchEvent(
  new MouseEvent('click', {
    clientX: 10,
    clientY: 2000
  })
);

document.dispatchEvent(
  new MouseEvent('click', {
    clientX: 10,
    clientY: 3000
  })
);
