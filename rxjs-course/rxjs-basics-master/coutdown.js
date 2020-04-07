import { interval, fromEvent, merge, empty } from 'rxjs';
import {
  scan,
  mapTo,
  filter,
  tap,
  takeWhile,
  takeUntil,
  startWith,
  switchMap,
} from 'rxjs/operators';

const counter$ = interval(1000);

const pauseButton = document.createElement('button');
pauseButton.setAttribute('id', 'abort');
document.body.appendChild(pauseButton);

const startButton = document.createElement('button');
startButton.setAttribute('id', 'start');
document.body.appendChild(startButton);

const pauseClick$ = fromEvent(pauseButton, 'click');
const startClick$ = fromEvent(startButton, 'click');
const COUNTDOWN_FROM = 10;

merge(startClick$.pipe(mapTo(true)), pauseClick$.pipe(mapTo(false)))
  .pipe(
    // map to counter
    // start a new counter on any click and stop it on pause click
    switchMap((shouldStart) => (shouldStart ? counter$ : empty())),
    mapTo(-1),
    scan((acc, value) => {
      return acc + value;
    }, COUNTDOWN_FROM),
    // tap(console.log),
    // filter(value => value >= 0) // with filter the stream will continuously run in the background leading to memory leak
    takeWhile((value) => value >= 0), // will stop the stream
    // takeUntil(pauseClick$),
    startWith(COUNTDOWN_FROM) // emitted as first value, then the countdown is decremented each x ms
  )
  .subscribe(console.log);

// will stop before reaching 0
setTimeout(() => {
  startButton.dispatchEvent(new MouseEvent('click'));
}, 1000);

// will stop before reaching 0
setTimeout(() => {
  pauseButton.dispatchEvent(new MouseEvent('click'));
}, 3000);
