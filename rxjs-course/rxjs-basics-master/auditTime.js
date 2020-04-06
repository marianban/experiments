import { fromEvent } from 'rxjs';
import { auditTime, sampleTime, throttleTime } from 'rxjs/operators';

// differs from throttle in way that it emits value in from trailing edge rather than leading edge

const click$ = fromEvent(document, 'click');

click$.pipe(auditTime(4000)).subscribe(console.log);

// auditTime(1000) equals to throttleTime(1000, asyncScheduler, { leading: false, trailing: true })
