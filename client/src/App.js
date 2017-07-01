import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from './configureStore';
import { RouteSwitcher } from './routeSwitcher';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <RouteSwitcher />
        </div>
      </Provider>
    );
  }
}

export default App;
