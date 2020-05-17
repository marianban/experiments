import { selector } from 'recoil';
import { todosAtom } from '../atoms/todos';
import { filterAtom } from '../atoms/filter';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../constants/TodoFilters';

export const visibleTodos = selector({
  key: 'visibleTodos',
  get: ({ get }) => {
    const todos = get(todosAtom);
    const visibilityFilter = get(filterAtom);
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos;
      case SHOW_COMPLETED:
        return todos.filter((t) => t.completed);
      case SHOW_ACTIVE:
        return todos.filter((t) => !t.completed);
      default:
        throw new Error('Unknown filter: ' + visibilityFilter);
    }
  },
});
