import { atom } from 'recoil';
import { v4 } from 'uuid';

export const todosAtom = atom({
  key: 'todos',
  default: [
    {
      text: 'Use Recoil',
      completed: false,
      id: v4(),
    },
  ],
});
