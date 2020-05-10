import React from 'react';
import { useImmer } from 'use-immer';
import { GlobalStateContext } from './GlobalStateContext';
import { deepFreeze } from './deepFreeze';

export const GlobalStateProvider = ({ children, store }) => {
  const [state, setState] = useImmer(store.initialState);
  return (
    <GlobalStateContext.Provider value={[deepFreeze(state), setState]}>
      {children}
    </GlobalStateContext.Provider>
  );
};
