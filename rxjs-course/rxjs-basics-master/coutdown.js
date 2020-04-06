import { interval, fromEvent } from 'rxjs';
import { scan, mapTo, filter, tap, takeWhile, takeUntil } from 'rxjs/operators';

const counter$ = interval(200);

const abortButton = document.createElement('button');
abortButton.setAttribute('id', 'abort');
document.body.appendChild(abortButton);

const abortClick$ = fromEvent(abortButton, 'click');

counter$
  .pipe(
    mapTo(-1),
    scan((acc, value) => {
      return acc + value;
    }, 10),
    // tap(console.log),
    // filter(value => value >= 0) // with filter the stream will continuously run in the background leading to memory leak
    takeWhile(value => value >= 0), // will stop the stream
    takeUntil(abortClick$)
  )
  .subscribe(console.log);

// will stop before reaching 0
setTimeout(() => {
  abortButton.dispatchEvent(new MouseEvent('click'));
}, 1000);
