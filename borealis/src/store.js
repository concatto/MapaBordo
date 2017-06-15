import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

export const history = createHistory();

const middleware = applyMiddleware(routerMiddleware(history), createLogger(), thunk);

const reducer = (state={}, action) => {
  return state;
};

export const store = createStore(reducer, middleware);
