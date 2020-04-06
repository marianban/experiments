import { interval, fromEvent } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const interval$ = interval(1000);
const clicks$ = fromEvent(document, 'click');

// similar to concat map but it throws away new subscriptions instead of queueing them
// useful for preventing multiple form submissions (request will be thrown away until the initial request is still pending)
clicks$.pipe(exhaustMap(() => interval$.pipe(take(3)))).subscribe(console.log);

//real world example
const authenticateUser = () => {
  return ajax.post(`https://reqres.in/api/login`, {
    email: 'eve.hold@reqres.in',
    password: 'cityslicka',
  });
};

const loginButton = document.getElementById('login');

const login$ = fromEvent(loginButton, 'click');
login$.pipe(exhaustMap(() => authenticateUser())).subscribe(console.log);

// swap exhaustMap with
// mergeMap will issue all requests in parallel and flatten the responses
// switch map will cancel the first request and use request issued by the second click
// concatMap will queue the requests and executes them one by one
