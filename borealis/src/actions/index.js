import axios from 'axios';
import { extractShips, extractPorts, extractFishes } from '../utils';

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
  fetchData(dispatch, id, "http://localhost:4000/viagem", "trips", (data) => {

    //THIS IS MADNESS!
    dispatchData(dispatch, "ships", extractShips(data));
    dispatchData(dispatch, "ports", extractPorts(data));
    dispatchData(dispatch, "fishes", extractFishes(data));
    dispatchData(dispatch, "trips", data);
  });
};

export const fetchGeneralSummary = () => (dispatch) => {
  fetchData(dispatch, null, "http://localhost:4000/relatorio/geral", "summary");
}

export const fetchFishSummary = () => (dispatch) => {
  fetchData(dispatch, null, "http://localhost:4000/relatorio/especies", "summary");
}

export const fetchShipSummary = () => (dispatch) => {
  fetchData(dispatch, null, "http://localhost:4000/relatorio/embarcacoes", "summary");
}

const fetchData = (dispatch, id, url, reducer, onSuccess) => {
  dispatch({type: "FETCH_START"});

  const suffix = id ? ("/" + id) : "";

  axios.get(url + suffix)
    .then((response) => {
      if (onSuccess) {
        onSuccess(response.data);
      } else {
        dispatchData(dispatch, reducer, response.data);
      }
    });
}

const dispatchData = (dispatch, reducer, data) => {
  dispatch({
    type: reducer.toUpperCase() + "_FETCHED",
    payload: data
  });
}
