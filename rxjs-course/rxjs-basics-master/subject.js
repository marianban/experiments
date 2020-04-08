// subject is an observable but it's multicast instead of unicast (subscribers share the same execution path)
// good for sharing events among application (loading, websocket connection)
// there are operators for turning multicast observables into unicast: share, shareReplay, multicast
import { Subject, interval } from 'rxjs';
import { tap, multicast, refCount, share } from 'rxjs/operators';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

const subject = new Subject();

const subscription = subject.subscribe(observer);

subject.next('Hello');

const subscriptionTwo = subject.subscribe(observer);

subject.next('World');

// example 2

const interval$ = interval(2000).pipe(
  tap((value) => console.log('new interval', value))
);

const multicastedInterval$ = interval$.pipe(
  // multicast(() => new Subject()),
  // refCount() // this will count the connected observers and complete the interval when the last is disconnected so we don't have to call manually connectedSub.unsubscribe() and we can get rid of connect as well
  share() // replaces the multicast(() => new Subject()), refCount() combination share will automatically create a subject and it will also automatically connect/unsubscribe from the subject as the first observer arrives and the last leaves
);
// if multicast operator is used then we have to use connect
// const connectedSub = multicastedInterval$.connect();

const subOne = multicastedInterval$.subscribe(observer);
const subTwo = multicastedInterval$.subscribe(observer);

setTimeout(() => {
  subOne.unsubscribe();
  subTwo.unsubscribe();
  // the issue is that behind the scene the interval will be still running because the subject is still connected
  // we have to disconnect the multicasted interval
  // connectedSub.unsubscribe();
}, 3000);

// this will start a new interval for each subscription
// interval$.subscribe(observer);
// interval$.subscribe(observer);

// this will share an interval
// interval$.subscribe(subject);
