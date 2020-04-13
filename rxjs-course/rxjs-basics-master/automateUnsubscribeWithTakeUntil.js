import { fromEvent, interval, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

// how to clean up subscription in life cycle hook?

// 1. create variable for each sub and manually unsubscribe
const clickSub = fromEvent(document, 'click')
  .pipe(
    map((event) => ({
      x: event.clientX,
      y: event.clientY,
    }))
  )
  .subscribe((v) => {
    console.log(v);
  });

const scrollSub = fromEvent(document, 'scroll')
  .pipe(throttleTime(30))
  .subscribe((v) => {
    console.log(v);
  });

const intervalSub = interval(1000).subscribe((v) => {
  console.log(v);
});

setTimeout(() => {
  clickSub.unsubscribe();
  scrollSub.unsubscribe();
  interval.unsubscribe();
}, 2000);

// 2. aggregate multiple subscriptions into one

const sub = fromEvent(document, 'click')
  .pipe(
    map((event) => ({
      x: event.clientX,
      y: event.clientY,
    }))
  )
  .subscribe((v) => {
    console.log(v);
  });

sub.add(
  fromEvent(document, 'scroll')
    .pipe(throttleTime(30))
    .subscribe((v) => {
      console.log(v);
    })
);

sub.add(
  interval(1000).subscribe((v) => {
    console.log(v);
  })
);

setTimeout(() => {
  sub.unsubscribe();
}, 2000);

// 2. takeUntil operator (preferred way)
// this removes the ceremony around storing subscription variables

const onDestroy$ = new Subject();

fromEvent(document, 'click')
  .pipe(
    map((event) => ({
      x: event.clientX,
      y: event.clientY,
    })),
    takeUntil(onDestroy$)
  )
  .subscribe((v) => {
    console.log(v);
  });

fromEvent(document, 'scroll')
  .pipe(throttleTime(30), takeUntil(onDestroy$))
  .subscribe((v) => {
    console.log(v);
  });

interval(1000)
  .pipe(takeUntil(onDestroy$))
  .subscribe((v) => {
    console.log(v);
  });

setTimeout(() => {
  onDestroy$.next();
  onDestroy$.complete();
}, 2000);
