import { animationFrameScheduler, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const ball = document.getElementById('ball');

// this code works but doesn't look as rx.js code lets refactor
// animationFrameScheduler.schedule(
//   function (position) {
//     ball.style.transform = `translate3d(0, ${position}px, 0)`;

//     if (position <= 300) {
//       this.schedule(position + 1);
//     }
//   },
//   0,
//   0
// );

interval(0, animationFrameScheduler)
  .pipe(takeWhile((val) => val <= 300))
  .subscribe((val) => {
    ball.style.transform = `translate3d(0, ${val}px, 0)`;
  });
