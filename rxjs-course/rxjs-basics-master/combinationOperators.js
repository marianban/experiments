import { from, fromEvent, BehaviorSubject, of, Subject } from 'rxjs';
import { concatMap, delay, withLatestFrom, pluck } from 'rxjs/operators';

const saveAnswer = (answer, testId) => {
  // what if we need testId here?
  return of({
    answer,
    testId,
    // we can do this but this feels dirty and it's only works with behaviour subject because others doesn't have the value property
    // testId: store$.value.testId, // correct approach is to use withLatestFrom operator
  }).pipe(delay(200));
};

const answerChange$ = fromEvent(radioButtons, 'click');

const store$ = new BehaviorSubject({
  testId: 'abc123',
  complete: false,
  moreData: {},
});

answerChange$
  .pipe(
    withLatestFrom(store$.pipe(pluck('testId'))),
    concatMap(([event, testId]) => {
      return saveAnswer(event.target.value, testId);
    })
  )
  .subscribe(console.log);

const store2$ = new Subject({
  testId: 'abc123',
  complete: false,
  moreData: {},
});

store2$.next({
  testId: 'abc123',
  complete: false,
  moreData,
});

answerChange$
  .pipe(
    // this will not emit any value because we are using classic subject
    // value will be emitted only after we typed a answer and called the next on subject after we subscribed to the answerChange
    withLatestFrom(store2$.pipe(pluck('testId'))),
    concatMap(([event, testId]) => {
      return saveAnswer(event.target.value, testId);
    })
  )
  .subscribe(console.log);
