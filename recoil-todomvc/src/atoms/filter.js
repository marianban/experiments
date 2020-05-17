import { SHOW_ALL } from '../constants/TodoFilters';
import { atom } from 'recoil';

export const filterAtom = atom({
  key: 'filter',
  default: SHOW_ALL,
});
