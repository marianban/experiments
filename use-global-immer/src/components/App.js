import React from 'react';
import Header from '../containers/Header';
import MainSection from '../containers/MainSection';
import { GlobalStateProvider } from '../GlobalStateProvider';
import { store } from '../store';

console.log({ store });

const App = () => {
  return (
    <GlobalStateProvider store={store}>
      <Header />
      <MainSection />
    </GlobalStateProvider>
  );
};

export default App;
