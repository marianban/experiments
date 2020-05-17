import Header from '../components/Header';
import React from 'react';
import { v4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { todosAtom } from '../atoms/todos';

const ConnectedHeader = () => {
  const [, setTodos] = useRecoilState(todosAtom);

  const addTodo = (text) => {
    setTodos((todos) => [
      ...todos,
      {
        text,
        id: v4(),
        completed: false,
      },
    ]);
  };

  return <Header addTodo={addTodo} />;
};

export default ConnectedHeader;
