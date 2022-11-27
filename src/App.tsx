import React from 'react';
import { Provider } from 'react-redux';
import { Display } from './components/Display/Display';
import { ButtonsContainer } from './containers/ButtonsContainer/ButtonsContainer';
import { MemoryContainer } from './containers/MemoryContainer/MemoryContainer';
import './App.css';
import store from './store/store';

export const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <noscript>Sorry, but your browser does not support JavaScript</noscript>
        <div className="calculator">
          <Display />
          <MemoryContainer />
          <ButtonsContainer />
        </div>
      </Provider>
    </>
  );
};
