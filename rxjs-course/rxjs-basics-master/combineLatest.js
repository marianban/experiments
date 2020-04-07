import { fromEvent, combineLatest, interval } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';

const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// this will measure the time how long did the user spend on the page
click$.pipe(withLatestFrom(interval(1000))).subscribe(console.log);

// combine latest will subscribe to multiple observable if all observable emitted at least one value then combine latest will emit an array of combined last values on the emission of each observable

combineLatest(keyup$, click$).subscribe(console.log);

// really good for use cases where the ui state is depended on multiple values

const first = document.getElementById('first');
const second = document.getElementById('second');

// helpers

const keyupAsValue = (elem) => {
  return fromEvent(elem, 'keyup').pipe(
    map((event) => event.target.valueAsNumber)
  );
};

combineLatest(keyupAsValue(first), keyupAsValue(second))
  .pipe(([first, second]) => !isNaN(first) && !isNaN(second))
  .subscribe(console.log);
