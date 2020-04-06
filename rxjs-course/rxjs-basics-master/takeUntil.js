import { interval, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// take until manages completion based on other stream

const counter$ = interval(1000);
const click$ = fromEvent(document, 'click');

counter$.pipe(takeUntil(click$)).subscribe(console.log);

setInterval(() => {
  document.dispatchEvent(new MouseEvent('click'));
}, 3000);
