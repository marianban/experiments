import { asyncScheduler, asapScheduler, range } from 'rxjs';

const observer = {
  next: (val) => console.log('next', val),
  error: (err) => console.log('error', err),
  complete: () => console.log('complete'),
};

asyncScheduler.schedule(() => {
  console.log('asyncScheduler');
});
Promise.resolve('microtask').then(console.log);
console.log('synchronous console.log');
asapScheduler.schedule(() => {
  console.log('asapScheduler');
});

const counter = document.getElementById('counter');

// this will bock the UI and only the last value will be updated
range(1, 10000, asapScheduler).subscribe((val) => {
  console.log('update dom value', val);
  // counter.innerHTML = val;
});

// this will update the UI continuously
range(1, 10000, asyncScheduler).subscribe((val) => {
  console.log('update dom value', val);
  // counter.innerHTML = val;
});
