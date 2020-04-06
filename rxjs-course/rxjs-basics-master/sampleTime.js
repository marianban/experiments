import { fromEvent, interval } from 'rxjs';
import { sampleTime, sample, map } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(
    sampleTime(4000),
    map(({ clientX, clientY }) => ({ clientX, clientY }))
  )
  .subscribe(console.log);

const timer$ = interval(1000);

// sample takes sample of source observable on duration defined by another observable
timer$.pipe(sample(click$)).subscribe(console.log);
