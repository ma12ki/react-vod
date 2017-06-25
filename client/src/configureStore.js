import { connectRoutes } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';

import { routesMap } from './routes';

import { videos } from './Videos/videos.reducers';
import { loadVideosList$ } from './Videos/videos.epics';

const history = createHistory();
const { reducer, middleware, enhancer } = connectRoutes(history, routesMap); 

const epicMiddleware = createEpicMiddleware(loadVideosList$);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ location: reducer, videos });
const middlewares = applyMiddleware(middleware, epicMiddleware);
const store = createStore(rootReducer, composeEnhancers(enhancer, middlewares));

export {
    store,
};
