import { Subject, BehaviorSubject } from 'rxjs';

// const loading$ = new Subject();
// this seed value will be provided to all subscribers
const loading$ = new BehaviorSubject(true);

export const loadingService = {
  showLoading: () => loading$.next(true),
  hideLoading: () => loading$.next(false),
  loadingStatus$: loading$.asObservable(),
};
