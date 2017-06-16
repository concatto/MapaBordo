import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

export const history = createHistory();

const middleware = applyMiddleware(routerMiddleware(history), createLogger(), thunk);

const shipReducer = (state={}, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {fetching: true};
    case "SHIPS_FETCHED":
      return {fetching: false, content: action.payload}
  }

  return state;
};

export const store = createStore(combineReducers({
  ships: shipReducer
}), middleware);
