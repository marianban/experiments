import { ObservableStore } from './store';

const store = new ObservableStore({
  user: 'brian',
  isAuthenticated: false,
});

store.selectState('user').subscribe(console.log);

store.updateState({
  user: 'joe',
});

// this will not log nothing because we are not subscribed to the state slice
store.updateState({
  isAuthenticated: true,
});
