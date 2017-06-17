import axios from 'axios';

export const fetchShips = (id) => (dispatch) => {
  fetchData(dispatch, id, "http://localhost:4000/embarcacao", "ships");
};

export const fetchPorts = (id) => (dispatch) => {
  fetchData(dispatch, id, "http://localhost:4000/porto", "ports");
};

export const fetchFishes = (id) => (dispatch) => {
  fetchData(dispatch, id, "http://localhost:4000/especie", "fishes");
};

export const fetchTrips = (id) => (dispatch) => {
  fetchData(dispatch, id, "http://localhost:4000/viagem", "trips");
};

const fetchData = (dispatch, id, url, reducer) => {
  dispatch({type: "FETCH_START"});

  const suffix = id ? ("/" + id) : "";

  axios.get(url + suffix)
    .then((response) => {
      dispatch({
        type: reducer.toUpperCase() + "_FETCHED",
        payload: response.data
      });
    });
}
