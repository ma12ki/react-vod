import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import { store } from './configureStore';

ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>),
    document.getElementById('root')
);
registerServiceWorker();
