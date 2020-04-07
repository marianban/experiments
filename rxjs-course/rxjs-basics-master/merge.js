import { fromEvent, merge } from 'rxjs';
import {} from 'rxjs/operators';

// simply merging observables

const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');
// this
// keyup$.subscribe(console.log);
// click$.subscribe(console.log);
// can be written as
merge(keyup$, click$).subscribe(console.log);
