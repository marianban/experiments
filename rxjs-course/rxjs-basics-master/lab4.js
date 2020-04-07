import { combineLatest, fromEvent, of } from 'rxjs';
import { map, filter, delay, mergeMap, share } from 'rxjs/operators';

const loanAmount = document.getElementById('loanAmount');
const interest = document.getElementById('interest');
const loanLength = document.querySelectorAll('.loanLength');
const expected = document.getElementById('expected');

// onsole.log(loanAmount, interest, loanLength);

const createInputValueStream = (elem) => {
  return fromEvent(elem, 'input').pipe(
    map((event) => parseFloat(event.target.value))
  );
};

const interest$ = createInputValueStream(interest);
const loanLength$ = createInputValueStream(loanLength);
const loanAmount$ = createInputValueStream(loanAmount);

const saveResponse = (mortageAmount) => {
  // delay for mimic delay of ajax request
  return of(mortageAmount).pipe(delay(1000));
};

const calculation$ = combineLatest(interest$, loanAmount$, loanLength$).pipe(
  map(([interest, loanAmount, loanLength]) => {
    return calculateMortgage(interest, loanAmount, loanLength);
  }),
  filter((mortageAmount) => !isNaN(mortageAmount)),
  // issue that this will delay the update of html
  // mergeMap((mortageAmount) => saveResponse(mortageAmount))
  share()
);

calculation$.subscribe((mortageAmount) => {
  expected.innerHTML = mortageAmount;
});
// issue with two subscription is that the calculation is now executed twice, once for each subscription, we have to use share for fixing this
calculation$
  .pipe(mergeMap((mortageAmount) => saveResponse(mortageAmount)))
  .subscribe();

function calculateMortgage(interest, loanAmount, loanLength) {
  const calculatedInterest = interest / 1200;
  const total =
    (loanAmount * calculatedInterest) /
    (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));

  return total.toFixed(2);
}
