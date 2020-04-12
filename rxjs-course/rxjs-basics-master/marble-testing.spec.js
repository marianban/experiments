import { TestScheduler, expectObservable } from 'rxjs/testing';
import { map, take, delay, tap, catchError } from 'rxjs/operators';
import { concat, from, of, throwError, interval } from 'rxjs';
import { breweryTypeahead } from './switchMap';

describe('Marble testing in RxJS', () => {
  let testScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should convert ASCII diagrams into observables', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('--a-b---c');
      const expected = '--a-b---c';
      expectObservable(source$).toBe(expected);
    });
  });

  it('should convert ASCII diagrams into observables', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('--a-b---c', { a: 1, b: 2, c: 3 });
      const final$ = source$.pipe(map((val) => val * 10));
      const expected = '--a-b---c';
      expectObservable(final$).toBe(expected, { a: 10, b: 20, c: 30 });
    });
  });

  it('should let you identify subscription points', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const source$ = cold('-a---b-|');
      const sourceTwo$ = cold('-c---d-|');
      const final$ = concat(source$, sourceTwo$);
      const expected = '-a---b--c---d-|';
      // source one subscribe immediately that's why we have ^ at the beginning
      const sourceOneExpectedSub = '^-- -- --!';
      const sourceTwoExpectedSub = '-- -- -- -^-- -- --!';
      expectObservable(final$).toBe(expected);
      expectSubscriptions(source$.subscriptions).toBe(sourceOneExpectedSub);
      expectSubscriptions(sourceTwo$.subscriptions).toBe(sourceTwoExpectedSub);
    });
  });

  it('should let you test hot observables', () => {
    testScheduler.run((helpers) => {
      const { cold, hot, expectObservable } = helpers;
      // hot observables are already running when the test starts
      // cold observables start when the test starts
      // we mark ^ the time when we subscribed to observable
      // if no carrot is supplied than the behaviour is same as cold observable
      const source$ = hot('--a-b--^-c');
      const final$ = source$.pipe(take(1));
      const expected = '--(c|)';
      expectObservable(final$).toBe(expected);
    });
  });

  it('should let you test synchronous operations', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = from([1, 2, 3, 4, 5]);
      // in marble diagram each value is a frame
      // for synchronous value we have to model them by surrounding them with parenthesis
      const expected = '(abcde|)';
      expectObservable(source$).toBe(expected, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
      });
    });
  });

  it('should let you test asynchronous operations', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = from([1, 2, 3, 4, 5]);
      // in marble diagram each value is a frame
      // for synchronous value we have to model them by surrounding them with parenthesis
      const final$ = source$.pipe(delay(10));
      // const expected = '----------(abcde|)';
      // equals to
      const expected = '10ms (abcde|)';
      expectObservable(final$).toBe(expected, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
      });
    });
  });

  it('should debounce input by 200ms', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const searchTerm = 'testing';
      const source$ = cold('a', { a: { target: { value: searchTerm } } });
      const final$ = source$.pipe(
        breweryTypeahead({
          getJSON: () => of(searchTerm).pipe(delay(300)),
        })
      );
      const expected = '500ms a';

      expectObservable(final$).toBe(expected, { a: searchTerm });
    });
  });

  it('should cancel active requests when another value is emitted', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const searchTerm = 'testing';
      const source$ = cold('a 250ms b', {
        a: { target: { value: 'first' } },
        b: { target: { value: 'second' } },
      });
      const final$ = source$.pipe(
        breweryTypeahead({
          getJSON: () => of(searchTerm).pipe(delay(300)),
        })
      );
      // we have to add 1 because a at the beginning adds one frame
      const expected = '751ms a';

      expectObservable(final$).toBe(expected, { a: searchTerm });
    });
  });

  it('should not emit duplicate values in a row', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const searchTerm = 'testing';
      const source$ = cold('a 250ms b', {
        a: { target: { value: 'first' } },
        b: { target: { value: 'first' } },
      });
      const final$ = source$.pipe(
        breweryTypeahead({
          getJSON: () => of(searchTerm).pipe(delay(300)),
        })
      );
      // we have to add 1 because a at the beginning adds one frame
      const expected = '500ms a';

      expectObservable(final$).toBe(expected, { a: searchTerm });
    });
  });

  it('should ignore ajax error', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const searchTerm = 'testing';
      const source$ = cold('a 250ms b', {
        a: { target: { value: 'first' } },
        b: { target: { value: 'first' } },
      });
      const final$ = source$.pipe(
        breweryTypeahead({
          getJSON: () => throwError('error'),
        })
      );
      // we have to add 1 because a at the beginning adds one frame
      const expected = '';

      expectObservable(final$).toBe(expected);
    });
  });

  it('should let you test errors and error messages', () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      // will fail for null
      const source$ = of({ firstName: 'Brian', lastName: 'Smith' }, null).pipe(
        map((o) => `${o.firstName} ${o.lastName}`),
        catchError(() => {
          throw 'Invalid user!';
        })
      );
      const expected = '(a#)';
      expectObservable(source$).toBe(
        expected,
        { a: 'Brian Smith' },
        'Invalid user!'
      );
    });
  });

  it('should let you test snapshots of streams that do not complete', () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const source$ = interval(1000).pipe(map((val) => `${val + 1}sec`));
      const expected = '1s a 999ms b 999ms c';
      const unsubscribe = '4s !';
      // we can tell that we want to unsubscribe after 4s otherwise the test will run forever
      expectObservable(source$, unsubscribe).toBe(expected, {
        a: '1sec',
        b: '2sec',
        c: '3sec',
      });
    });
  });
});
