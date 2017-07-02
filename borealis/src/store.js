import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';

export const history = createHistory();

const middleware = applyMiddleware(routerMiddleware(history), thunk, createLogger());

const shipReducer = (state={}, action) => (entityReducer("SHIPS", state, action));
const portReducer = (state={}, action) => (entityReducer("PORTS", state, action));
const fishReducer = (state={}, action) => (entityReducer("FISHES", state, action));
const tripReducer = (state={}, action) => (entityReducer("TRIPS", state, action));
const summaryReducer = (state={}, action) => (entityReducer("SUMMARY", state, action));

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

const modalReducer = (state={}, action) => {
  switch (action.type) {
    case "MODAL_OPEN":
    case "MODAL_CLOSE":
      return {...state, [action.name]: {...state[action.name], open: (action.type === "MODAL_OPEN")}};
    case "MODAL_TOGGLE_DISABLE":
      return {...state, [action.name]: {...state[action.name], disabled: action.disabled}};
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
  summary: summaryReducer,
  form: formReducer,
  modal: modalReducer,
  notifications,
}), middleware);
