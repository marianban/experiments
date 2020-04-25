import React, { useContext } from 'react';
import { useImmer } from 'use-immer';

export function rex(store) {
  return store;
}

export const createStore = (obj) => {
  const keys = Object.keys(obj);
  return {
    // TODO: use symbols
    keys,
    ...keys.reduce(
      (acc, key) => ({ ...acc, [key]: { key, value: obj[key] } }),
      {}
    ),
  };
};

export const RexContext = React.createContext();

export const Provider = ({ store, children }) => {
  const initialState = store.keys.reduce(
    (state, key) => ({
      ...state,
      [key]: store[key].value.state,
    }),
    {}
  );
  const [state, updateState] = useImmer(initialState);
  const value = {
    state,
    updateState,
  };
  return <RexContext.Provider value={value}>{children}</RexContext.Provider>;
};

export const useRex = (store) => {
  const { state, updateState } = useContext(RexContext);
  const { methods } = getMembers(store.value);
  const actions = methods.reduce((acc, method) => {
    acc[method] = () => {
      updateState((draft) => {
        const subState = draft[store.key];
        store.value[method].call({ state: subState });
      });
    };
    return acc;
  }, {});

  return [state[store.key], actions];
};

function getMembers(obj) {
  const methods = [];
  const getters = [];
  for (const key of Object.keys(obj)) {
    const propertyType = getTypeOfProperty(obj, key);
    if (propertyType === 'function') {
      methods.push(key);
    } else if (propertyType === 'getter') {
      getters.push(getters);
    }
  }
  return {
    methods,
    getters,
  };
}

function getTypeOfProperty(object, property) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc.hasOwnProperty('value')) {
    if (typeof object[property] === 'function') {
      return 'function';
    }
    return 'data';
  }

  if (typeof desc.get === 'function' && typeof desc.set === 'function') {
    return 'accessor';
  }

  return typeof desc.get === 'function' ? 'getter' : 'setter';
}
