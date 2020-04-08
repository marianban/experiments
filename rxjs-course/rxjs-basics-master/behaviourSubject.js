// will deliver the seed to late subscribers, it will basically record an emitted value and deliver it immediately to the new subscriber when it's connected IMPORTANT it will replay only the last value, use it when delivery of the current state to late subscribers is important, it can also accept an initial seed value

import { BehaviorSubject } from 'rxjs';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

// we can even define a initial seed value
const subject = new BehaviorSubject('Hello');

const subscription = subject.subscribe(observer);

const secondSubscription = subject.subscribe(observer);

subject.next('World');

setTimeout(() => {
  subject.subscribe(observer);

  // we can even access the current value synchronously subject.getValue() but it's not recommended
}, 3000);
