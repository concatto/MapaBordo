import axios from 'axios';

export const fetchShips = (id) => (dispatch, getState) => {
  if (id && getState().ships.content && getState().ships.content[id]) {
    return;
  }

  dispatch({type: "FETCH_START"});

  const suffix = id ? ("/" + id) : "";

  axios.get("http://localhost:4000/embarcacao" + suffix)
    .then((response) => {
      dispatch({
        type: "SHIPS_FETCHED",
        payload: response.data
      });
    });
};
