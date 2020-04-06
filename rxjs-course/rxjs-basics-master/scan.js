import { from } from 'rxjs';
import {
  reduce,
  scan,
  map,
  distinctUntilChanged,
  distinctUntilKeyChanged
} from 'rxjs/operators';

const numbers = [1, 2, 3, 4, 5];
const user = [
  { name: 'Brian', loggedId: false, token: null },
  { name: 'Brian', loggedId: true, token: 'abc' },
  { name: 'Brian', loggedId: true, token: '123' }
];

const state$ = from(user).pipe(scan((acc, value) => ({ ...acc, ...value })));

const $name = state$.pipe(
  // this is better for performance because we are doing this before map
  // distinctUntilChanged((prev, curr) => {
  //   return prev.name === curr.name;
  // }),
  distinctUntilKeyChanged('name'), // same as before but shorter to type
  map(state => state.name)
  // distinctUntilChanged() // fixing duplicated name
);

$name.subscribe(console.log);
