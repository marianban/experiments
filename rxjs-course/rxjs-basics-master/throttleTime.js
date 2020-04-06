// double click, update limits from scroll

import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$.pipe(throttleTime(3000)).subscribe(console.log);

// import './style.css';
// console.clear();

// // begin lesson code
// import { fromEvent, asyncScheduler } from 'rxjs';
// import { map, throttleTime, tap } from 'rxjs/operators';

// /*
//  * BEGIN FIRST SECTION OF LESSON
//  */
// // const click$ = fromEvent(document, 'click');

// // click$.pipe(
//      /*
//       * throttleTime will emit the first value, then ignore
//       * values for the specified duration. After that duration
//       * has passed, the next value from the source will be
//       * emitted, with the previous behavior repeated.
//       */
// //   throttleTime(3000),
// // ).subscribe(console.log);

// /*
//  * BEGIN SECTION SECTION OF LESSON
//  */
// /*
//  * Calculate progress based on scroll position
//  */
// function calculateScrollPercent(element) {
//   const { scrollTop, scrollHeight, clientHeight } = element;

//   return (scrollTop / (scrollHeight - clientHeight)) * 100;
// }

// // elems
// const progressBar: any = document.querySelector('.progress-bar');

// // streams
// const scroll$ = fromEvent(document, 'scroll');

// const progress$ = scroll$.pipe(
//   /*
//    * For extremely active streams like scroll events,
//    * throttleTime can be used to limit the number of emitted
//    * values. In this case, we'll just update our scroll bar every
//    * 30ms of scrolling.
// throttle by default takes the first (leading value) and ignores values until the window has passed, in lot of cases we need the last value - asyncScheduler can be used for this
//    */
//   throttleTime(30,asyncScheduler, { leading: false, trailing: true }),
//   /*
//    * For every scroll event, we use our helper function to
//    * map to a current scroll progress value.
//    */
//   map(({ target }: any) => calculateScrollPercent(target.documentElement)),
//   tap(console.log)
// );
// /*
//  * We can then take the emitted percent and set the width
//  * on our progress bar.
//  */
// progress$.subscribe(percent => {
//   progressBar.style.width = `${percent}%`;
// });
