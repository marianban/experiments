// use filter and partition logic to refactor a common use case when we have condition in the subscription logic

import { fromEvent, partition } from 'rxjs';
import { pluck, filter } from 'rxjs/operators';

const MOVE_SPEED = 20;
let leftPosition = 0;

const box = document.getElementById('box');

const click$ = fromEvent(document, 'click');
const xPositionClick = click$.pipe(pluck('clientX'));

// we are going to refactor this
xPositionClick.subscribe((xPos) => {
  if (xPos < window.innerWidth / 2) {
    box.style.left = `${(leftPosition -= MOVE_SPEED)}px`;
  }
});

// refactored version with the filter operator
const leftSideClick$ = xPositionClick.pipe(
  filter((xPos) => xPos < window.innerWidth / 2)
);

xPositionClick.subscribe((xPos) => {
  box.style.left = `${(leftPosition -= MOVE_SPEED)}px`;
});

// what if we want to write the above ☝️ with an if else condition ?
xPositionClick.subscribe((xPos) => {
  if (xPos < window.innerWidth / 2) {
    box.style.left = `${(leftPosition -= MOVE_SPEED)}px`;
  } else {
    box.style.left = `${(leftPosition += MOVE_SPEED)}px`;
  }
});

// refactored with partition
// partition will separate one stream into two streams

const [leftSideClick$, rightSideClick$] = partition(xPositionClick, (xPos) => {
  return xPos < window.innerWidth / 2;
});

leftSideClick$.subscribe(() => {
  box.style.left = `${(leftPosition -= MOVE_SPEED)}px`;
});

rightSideClick$.subscribe(() => {
  box.style.left = `${(leftPosition += MOVE_SPEED)}px`;
});
