import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// notice that 3 at the end is logs only applies to consecutive duplicated values
const numbers$ = of(1, 1, 2, 3, 3, 3, 4, 5, 3);

numbers$.pipe(distinctUntilChanged()).subscribe(console.log);
