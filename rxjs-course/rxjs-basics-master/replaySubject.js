import { ReplaySubject } from 'rxjs';
import {} from 'rxjs/operators';

// allow late subscribers to receive n last values

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

// if no value is provided then replaySubject will replay all emitted values to late subscribers
// or we can provide 2 and then only last 2 values are replayed
const subject = new ReplaySubject();

subject.next('Hello');
subject.next('World');
subject.next('Goodbye');

subject.subscribe(observer);
