import { fromEvent } from 'rxjs';
import { debounceTime, mergeMap, mergeAll } from 'rxjs/operators';
import ajax from 'rxjs/ajax';

const textInput = document.getElementById('text');

const input$ = fromEvent(textInput, 'keyup');

// is shorter version
input$
  .pipe(
    debounceTime(1000),
    mergeMap(event => {
      const term = event.target.value;
      return ajax.getJSON(`https://api.github.com/users/${term}`);
    })
  )
  .subscribe(console.log);

// of
input$
  .pipe(
    debounceTime(1000),
    map(event => {
      const term = event.target.value;
      return ajax.getJSON(`https://api.github.com/users/${term}`);
    }),
    mergeAll() // Flattens an Observable-of-Observables.
  )
  .subscribe(console.log);
