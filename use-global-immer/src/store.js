import { v4 } from 'uuid';
import { SHOW_ALL } from './constants/TodoFilters';
import { createStore } from './createStore';

export const store = createStore({
  todos: [
    {
      text: 'Use Regrok',
      completed: false,
      id: v4(),
    },
  ],
  filter: SHOW_ALL,
});
