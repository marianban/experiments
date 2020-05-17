import React from 'react';
import TodoList from '../components/TodoList';
import { todosAtom } from '../atoms/todos';
import { visibleTodos } from '../selectors/visibleTodos';
import { useRecoilState, useRecoilValue } from 'recoil';

const VisibleTodoList = () => {
  const [, setTodos] = useRecoilState(todosAtom);
  const filteredTodos = useRecoilValue(visibleTodos);

  const editTodo = (todo) =>
    setTodos((todos) => {
      return updateItem(todos, todo);
    });

  const deleteTodo = ({ id }) =>
    setTodos((todos) => {
      return [...todos.filter((todo) => todo.id !== id)];
    });

  const completeTodo = (todoId) => {
    setTodos((todos) => {
      const index = findIndex(todos, todoId);
      return updateItem(todos, {
        ...todos[index],
        completed: true,
      });
    });
  };

  return (
    <TodoList
      filteredTodos={filteredTodos}
      editTodo={editTodo}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
    />
  );
};

function updateItem(todos, todo) {
  const index = findIndex(todos, todo.id);
  return [...todos.slice(0, index), todo, ...todos.slice(index + 1)];
}

function findIndex(todos, id) {
  return todos.findIndex((t) => t.id === id);
}

export default VisibleTodoList;
