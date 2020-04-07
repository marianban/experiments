import { fromEvent, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  takeUntil,
  mergeMapTo,
  finalize,
  tap,
  switchMapTo,
  pluck,
  exhaustMap,
} from 'rxjs/operators';

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const pollingStatus = document.getElementById('polling-status');
const dogImage = document.getElementById('dog');

const startClicks$ = fromEvent(startButton, 'click');
const stopClicks$ = fromEvent(stopButton, 'click');

startClicks$
  .pipe(
    exhaustMap(() =>
      timer(0, 5000).pipe(
        tap(() => {
          pollingStatus.innerHTML = 'Active';
        }),
        switchMapTo(
          ajax.getJSON('https://random.dog/woof.json').pipe(pluck('url'))
        ),
        takeUntil(stopClicks$),
        finalize(() => (pollingStatus.innerHTML = 'Stopped'))
      )
    )
  )
  .subscribe((url) => (dogImage.src = url));
