import { fromEvent } from 'rxjs';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete1')
};

const source$ = fromEvent(document, 'click');

const subOne = source$.subscribe(observer);
const subTwo = source$.subscribe(observer);

document.dispatchEvent(new MouseEvent('click'));

setTimeout(() => {
  console.log('unsubscribing');
  subOne.unsubscribe();
  setTimeout(() => {
    document.dispatchEvent(new MouseEvent('click'));
  });
}, 1000);
