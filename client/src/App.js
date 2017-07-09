import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { ThemedContainer } from './themedContainer';
import { store } from './configureStore';
import { RouteSwitcher } from './routeSwitcher';
import styles from './app.module.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemedContainer>
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
        </ThemedContainer>
      </Provider>
    );
  }
}

export default App;
