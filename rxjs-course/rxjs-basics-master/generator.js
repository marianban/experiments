import { of, from } from 'rxjs';

function* hello() {
  yield 'Hello';
  yield 'world';
}

const iterator = hello();

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete1')
};

const source$ = from(iterator);

source$.subscribe(observer);
