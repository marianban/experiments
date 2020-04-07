import { of } from 'rxjs';
import { startWith, endWith } from 'rxjs/operators';

const numbers$ = of(1, 2, 3).pipe(startWith('a'), endWith('a', 'b', 'c'));

numbers$.subscribe(console.log);
