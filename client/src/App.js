import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import logo from './logo.svg';
import './App.css';

import { RouteSwitcher } from './routeSwitcher';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <RouteSwitcher />
      </div>
    );
  }
}

export default App;
