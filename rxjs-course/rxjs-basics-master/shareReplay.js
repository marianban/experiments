// this will convert unicast to multicast observable and also replay values, by default it replays the all history

import { ajax } from 'rxjs/ajax';
import { fromEvent } from 'rxjs';
import { mergeMapTo, shareReplay } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

const ajax$ = ajax('https://api.github.com/users/octocat');

const click$ = fromEvent(document, 'click');
// we can also specify how long the values are replayed
const clickRequest$ = click$.pipe(mergeMapTo(ajax$), shareReplay(1, 2000));

document.dispatchEvent(new MouseEvent('click'));

// problem is that each click generates two responses
clickRequest$.subscribe(observer);
clickRequest$.subscribe(observer);

setTimeout(() => {
  console.log('subscribing');
  clickRequest$.subscribe(observer);
}, 5000);
