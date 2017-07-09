import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { store } from './configureStore';
import { RouteSwitcher } from './routeSwitcher';
import styles from './app.module.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={styles.app}>
          <div className={styles.header}>
            <h2>React-VoD</h2>
          </div>
          <Container className={styles.container}>
            <Row>
              <Col xs='12'>
                <RouteSwitcher />
              </Col>
            </Row>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
