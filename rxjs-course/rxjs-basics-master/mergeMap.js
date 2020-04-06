import { fromEvent, interval, from } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const click$ = fromEvent(document, 'click');
const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const interval$ = interval(1000);

// merge map will subscribe to interval on each click and tries to emitting values
click$.pipe(mergeMap(() => interval$)).subscribe(console.log);

// starts emitting interval values after mousedown and stops on mouseup
mousedown$
  .pipe(mergeMap(() => interval$.pipe(takeUntil(mouseup$))))
  .subscribe(console.log);

// example for save

const coordinates$ = click$.pipe(
  map(event => ({
    x: event.clientX,
    y: event.clientY
  }))
);

const coordinatesWithSave$ = coordinates$.pipe(
  mergeMap(coords =>
    ajax.post('https://www.mocky.io/v2/518415ba171ea3a0074eed', coords)
  )
);

coordinatesWithSave$.subscribe(console.log);
