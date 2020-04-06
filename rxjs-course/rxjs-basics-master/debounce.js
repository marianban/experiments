import { fromEvent, interval } from 'rxjs';
import {
  debounceTime,
  pluck,
  distinctUntilChanged,
  debounce,
  interval
} from 'rxjs/operators';

const click$ = fromEvent(document, 'click');
const inputBox = document.getElementById('text-input');
const input$ = fromEvent(inputBox, 'keyup');

// // emits only the last click/typing in keyboard after 1s of pause
// input$
//   .pipe(debounceTime(1000), pluck('target', 'value'), distinctUntilChanged())
//   .subscribe(console.log);

input$
  .pipe(
    // debounce can emit values based on rate of other observables, like tick each frame
    debounce(() => interval(1000)),
    pluck('target', 'value'),
    distinctUntilChanged()
  )
  .subscribe(console.log);
