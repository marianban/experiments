import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);

numbers$
  .pipe(
    tap(value => console.log('before', value)),
    map(value => value * 10),
    tap({
      next: value => console.log('after', value),
      complete: () => console.log('done'),
      error: () => console.log('error')
    })
  )
  .subscribe(value => {
    console.log('from subscribe', value);
  });
