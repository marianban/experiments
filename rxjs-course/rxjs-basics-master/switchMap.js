import { fromEvent, empty, interval } from 'rxjs';
import {
  switchMap,
  debounceTime,
  pluck,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const click$ = fromEvent(document, 'click');
const interval$ = interval(1000);

// if clicked the first interval is stopped and the previous interval subscription is completed
click$.pipe(switchMap(() => interval$)).subscribe(console.log);

const inputBox = document.getElementById('text-input');
const input$ = fromEvent(inputBox, 'keyup');

input$
  .pipe(
    // debounceTime only emits after 200ms pause
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    // this will make new request and cancel previous waiting if new request is issued
    switchMap((searchTerm) =>
      ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}}`).pipe(
        // will keep the subscription alive if error is occurred
        // we have to pipe it with the observable where we except the error to be thrown like here failing a ajax request
        catchError((error) => {
          // we have to be careful here because whatever we return from here it will be
          // published as an result and our subscription have to account for this
          // alternatively we can ignore the response by returning an empty observable
          return empty();
        })
      )
    )
  )
  .subscribe((response) => {
    console.log(response);
  });
