import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

export const history = createHistory();

const middleware = applyMiddleware(routerMiddleware(history), thunk, createLogger());

const shipReducer = (state={}, action) => (entityReducer("SHIPS", state, action));
const portReducer = (state={}, action) => (entityReducer("PORTS", state, action));
const fishReducer = (state={}, action) => (entityReducer("FISHES", state, action));
const tripReducer = (state={}, action) => (entityReducer("TRIPS", state, action));

const entityReducer = (prefix, state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {fetching: true};
    case prefix + "_FETCHED":
      return {fetching: false, content: {...state.content, ...action.payload}};
    case LOCATION_CHANGE:
      return {};
    default:
      return state;
  }
}

export const store = createStore(combineReducers({
  ships: shipReducer,
  ports: portReducer,
  fishes: fishReducer,
  trips: tripReducer,
}), middleware);
