import { fromEvent, throwError, timer, of } from 'rxjs';
import { mergeMap, retryWhen, catchError } from 'rxjs/operators';

const btn = document.getElementById('btn');
const click$ = fromEvent(btn, 'click');

// we are going to refactor this
click$.pipe(
  mergeMap(
    throwError({
      status: 400,
      message: 'Server error',
    }).pipe(
      retryWhen((attempts) => {
        return attempts.pipe(
          mergeMap((error, i) => {
            const attemptNumber = i + 1;
            if (
              attemptNumber > 3 ||
              [404, 500].find((e) => e === error.status)
            ) {
              console.log('Giving up!');
              return throwError(error);
            }
            console.log(
              `Attempt ${attemptNumber}: retrying in ${attemptNumber * 1000}ms`
            );
            return timer(attemptNumber * 1000);
          })
        );
      }),
      catchError((err) => of(err.message))
    )
  )
);

// refactored version
export function customRetry(source) {
  return function ({
    excludedStatusCodes = [],
    retryAttempts = 3,
    scalingDuration = 1000,
  } = {}) {
    return source.pipe(
      retryWhen((attempts) => {
        return attempts.pipe(
          mergeMap((error, i) => {
            const attemptNumber = i + 1;
            if (
              attemptNumber > retryAttempts ||
              excludedStatusCodes.find((e) => e === error.status)
            ) {
              console.log('Giving up!');
              return throwError(error);
            }
            console.log(
              `Attempt ${attemptNumber}: retrying in ${attemptNumber * 1000}ms`
            );
            return timer(attemptNumber * scalingDuration);
          })
        );
      })
    );
  };
}

click$.pipe(
  mergeMap(
    throwError({
      status: 400,
      message: 'Server error',
    }).pipe(
      customRetry({ retryAttempts: 4 }),
      catchError((err) => of(err.message))
    )
  )
);
