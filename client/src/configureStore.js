import { connectRoutes } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';

import { routesMap } from './rootRoutes';
import { rootReducerMap } from './rootReducerMap';
import { rootEpic } from './rootEpic';

const history = createHistory();
const {
    reducer: locationReducer,
    middleware: locationMiddleware,
    enhancer: locationEnhancer
} = connectRoutes(history, routesMap); 

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    location: locationReducer,
    ...rootReducerMap
});
const middlewares = applyMiddleware(locationMiddleware, epicMiddleware);
const store = createStore(rootReducer, composeEnhancers(locationEnhancer, middlewares));

export { store };
