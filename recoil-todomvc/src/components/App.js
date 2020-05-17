import React from 'react';
import Header from '../containers/Header';
import MainSection from '../containers/MainSection';
import { RecoilRoot } from 'recoil';
const App = () => {
  return (
    <RecoilRoot>
      <Header />
      <MainSection />
    </RecoilRoot>
  );
};

export default App;
