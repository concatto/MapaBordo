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

  axios.get(url + suffix).then((response) => {
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

export const openModal = (name) => {
  return {type: "MODAL_OPEN", name};
};

export const closeModal = (name) => {
  return {type: "MODAL_CLOSE", name};
};

export const toggleDisable = (name, disabled) => {
  return {type: "MODAL_TOGGLE_DISABLE", name, disabled};
}

export const deleteTrip = (id) => (dispatch) => {
  dispatch(toggleDisable("trip-modal", true));

  axios.delete("http://localhost:4000/viagem/" + id).then((response) => {
    dispatch(toggleDisable("trip-modal", false));
    dispatch(closeModal("trip-modal"));
  });
};

export const postFish = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/especie", data);
};

export const postPort = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/porto", data);
};

export const postShip = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/embarcacao", data);
};

export const postTrip = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/viagem", data);
};

const postData = (dispatch, url, data) => {
  dispatch({type: "POST_START"});

  axios.post(url, data).then((response) => {
    dispatch({type: "POST_SUCCEEDED"});
  });
};
