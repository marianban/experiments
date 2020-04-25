import React from 'react';
import { useRex, rex, Provider, createStore } from './rex';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

const counter = rex({
  state: {
    value: 0,
  },
  increment() {
    this.state.value++;
  },
});

const store = createStore({
  counter,
});

const Counter = ({ name }) => {
  const [{ value }, { increment }] = useRex(store.counter);
  return (
    <div>
      <div data-testid={`${name}-value`}>{value}</div>
      <button data-testid={`${name}-increment`} onClick={increment}>
        Increment
      </button>
    </div>
  );
};

const Container = () => {
  const [{ value }] = useRex(store.counter);
  return (
    <>
      <div data-testid="root-value">{value}</div>
      <Counter key="first" name="first" />
      <Counter key="second" name="second" />
    </>
  );
};

describe('rex', () => {
  const makeWrapper = (store) => ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('can read state', () => {
    const { result } = renderHook(() => useRex(store.counter), {
      wrapper: makeWrapper(store),
    });
    const [{ value }, { increment }] = result.current;
    expect(value).toBe(0);
    expect(typeof increment).toBe('function');
    act(() => {
      increment();
      increment();
    });
    expect(result.current[0].value).toBe(2);
  });

  it('should share state between components component', () => {
    render(
      <Provider store={store}>
        <Container />
      </Provider>
    );
    const rootValue = screen.getByTestId('root-value');
    const firstValue = screen.getByTestId('first-value');
    const incrementFirst = screen.getByTestId('first-increment');
    const incrementSecond = screen.getByTestId('second-increment');
    const secondValue = screen.getByTestId('second-value');

    expect(rootValue).toHaveTextContent(0);
    expect(firstValue).toHaveTextContent(0);
    expect(secondValue).toHaveTextContent(0);

    fireEvent.click(incrementFirst);

    expect(rootValue).toHaveTextContent(1);
    expect(firstValue).toHaveTextContent(1);
    expect(secondValue).toHaveTextContent(1);

    fireEvent.click(incrementSecond);

    expect(rootValue).toHaveTextContent(2);
    expect(firstValue).toHaveTextContent(2);
    expect(secondValue).toHaveTextContent(2);
  });
});
