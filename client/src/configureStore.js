import { connectRoutes } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';

import { routesMap } from './routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap); 

const rootReducer = combineReducers({ location: reducer });
const middlewares = applyMiddleware(middleware);
const store = createStore(rootReducer, composeEnhancers(enhancer, middlewares));

export {
    store,
};
