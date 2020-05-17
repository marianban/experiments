import React, { useMemo } from 'react';
import MainSection from '../components/MainSection';
import { useRecoilState } from 'recoil';
import { todosAtom } from '../atoms/todos';

const MainSectionContainer = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const todosCount = todos.length;

  const completedCount = useMemo(
    () =>
      todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0),
    [todos]
  );

  const completeAllTodos = () =>
    setTodos((todos) => todos.map((todo) => ({ ...todo, completed: true })));

  const clearCompleted = () =>
    setTodos((todos) => todos.filter((todo) => !todo.completed));

  return (
    <MainSection
      todosCount={todosCount}
      completedCount={completedCount}
      completeAllTodos={completeAllTodos}
      clearCompleted={clearCompleted}
    />
  );
};

export default MainSectionContainer;
