import axios from 'axios';
import Notifications from 'react-notification-system-redux';
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

export const deleteFish = (id) => (dispatch) => {
  dispatch(toggleDisable("fish-modal", true));

  axios.delete("http://localhost:4000/especie/" + id).then((response) => {
    dispatch(toggleDisable("fish-modal", false));
    dispatch(closeModal("fish-modal"));
  });
};

export const deleteShip = (id) => (dispatch) => {
  console.log("Hi");
  dispatch(toggleDisable("ship-modal", true));

  axios.delete("http://localhost:4000/embarcacao/" + id).then((response) => {
    dispatch(toggleDisable("ship-modal", false));
    dispatch(closeModal("ship-modal"));
  });
};

export const deletePort = (id) => (dispatch) => {
  dispatch(toggleDisable("port-modal", true));

  axios.delete("http://localhost:4000/porto/" + id).then((response) => {
    dispatch(toggleDisable("port-modal", false));
    dispatch(closeModal("port-modal"));
    dispatch(Notifications.success({message: "Porto removido com sucesso"}));
  });
};

export const postFish = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/especie", data);
};

export const postPort = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/porto", data, () => {
    dispatch(Notifications.success({message: "Porto cadastrado com sucesso", autoDismiss: 0}));
  });
};

export const postShip = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/embarcacao", data);
};

export const postTrip = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/viagem", data);
};

const postData = (dispatch, url, data, onSuccess) => {
  dispatch({type: "POST_START"});

  axios.post(url, data).then((response) => {
    dispatch({type: "POST_SUCCEEDED"});
    if (onSuccess) onSuccess();
  });
};
