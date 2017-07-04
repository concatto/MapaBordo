import axios from 'axios';
import Notifications from 'react-notification-system-redux';
import { extractShips, extractPorts, extractFishes } from '../utils';
import { push } from 'react-router-redux';

axios.defaults.timeout = 8000;

export const fetchShips = (id) => (dispatch) => {
  fetchData(dispatch, id, "http://localhost:4000/api/embarcacao", "ships");
};

export const fetchPorts = (id) => (dispatch) => {
  fetchData(dispatch, id, "http://localhost:4000/api/porto", "ports");
};

export const fetchFishes = (id) => (dispatch) => {
  fetchData(dispatch, id, "http://localhost:4000/api/especie", "fishes");
};

export const fetchTrips = (id) => (dispatch) => {
  fetchData(dispatch, id, "http://localhost:4000/api/viagem", "trips", (data) => {

    //THIS IS MADNESS!
    dispatchData(dispatch, "ships", extractShips(data));
    dispatchData(dispatch, "ports", extractPorts(data));
    dispatchData(dispatch, "fishes", extractFishes(data));
    dispatchData(dispatch, "trips", data);
  });
};

export const fetchGeneralSummary = () => (dispatch) => {
  fetchData(dispatch, null, "http://localhost:4000/api/relatorio/geral", "summary");
}

export const fetchFishSummary = () => (dispatch) => {
  fetchData(dispatch, null, "http://localhost:4000/api/relatorio/especies", "summary");
}

export const fetchShipSummary = () => (dispatch) => {
  fetchData(dispatch, null, "http://localhost:4000/api/relatorio/embarcacoes", "summary");
}

const fetchData = (dispatch, id, url, reducer, onSuccess, onError) => {
  dispatch({type: "FETCH_START"});

  const suffix = id ? ("/" + id) : "";

  axios.get(url + suffix).then((response) => {
    if (onSuccess) {
      onSuccess(response.data);
    } else {
      dispatchData(dispatch, reducer, response.data);
    }
  }).catch((error) => {
    if (onError) {
      onError(error);
    } else {
      dispatchFailure(dispatch, reducer, error);
    }
    console.log(error);
  });
}

const dispatchData = (dispatch, reducer, data) => {
  dispatch({
    type: reducer.toUpperCase() + "_FETCHED",
    payload: data
  });
}

const dispatchFailure = (dispatch, reducer, error) => {
  dispatch({
    type: reducer.toUpperCase() + "_FAILED",
    payload: error
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
  deleteEntity(dispatch, id, "http://localhost:4000/api/viagem", "trip-modal", () => {
    dispatch(notify("success", "Viagem removida com sucesso."));
    dispatch(push("/visualizar/viagem"));
  }, () => {
    dispatch(notify("error", "Falha ao remover a viagem."));
  });
};

export const deleteFish = (id) => (dispatch) => {
  deleteEntity(dispatch, id, "http://localhost:4000/api/especie", "fish-modal", () => {
    dispatch(notify("success", "Espécie removida com sucesso."));
    dispatch(push("/visualizar/especie"));
  }, (err) => {
    dispatch(notify("error", withDetail("Falha ao remover a espécie.", err)));
  });
};

export const deleteShip = (id) => (dispatch) => {
  deleteEntity(dispatch, id, "http://localhost:4000/api/embarcacao", "ship-modal", () => {
    dispatch(notify("success", "Embarcação removida com sucesso."));
    dispatch(push("/visualizar/embarcacao"));
  }, (err) => {
    dispatch(notify("error", withDetail("Falha ao remover a embarcação.", err)));
  });
};

export const deletePort = (id) => (dispatch) => {
  deleteEntity(dispatch, id, "http://localhost:4000/api/porto", "port-modal", () => {
    dispatch(notify("success", "Porto removido com sucesso."));
    dispatch(push("/visualizar/porto"));
  }, (err) => {
    console.log(err);
    dispatch(notify("error", withDetail("Falha ao remover o porto.", err)));
  });
};

const deleteEntity = (dispatch, id, url, modalName, onSuccess, onFailed) => {
  dispatch(toggleDisable(modalName, true));
  dispatch({type: "DELETE_START"});

  axios.delete(url + "/" + id).then((response) => {
    dispatch({type: "DELETE_SUCCEEDED", response});
    if (onSuccess) onSuccess(response);
  }).catch((error) => {
    dispatch({type: "DELETE_FAILED", error});
    if (onFailed) onFailed(error.response.data);
  }).then(() => {
    dispatch(toggleDisable(modalName, false));
    dispatch(closeModal(modalName));
  });
}


export const postFish = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/api/especie", data, () => {
    dispatch(notify("success", "Espécie cadastrada com sucesso!"));
    dispatch(push("/cadastrar"));
  }, (err) => {
    dispatch(notify("error", "Erro ao cadastrar a nova espécie."));
  });
};

export const postPort = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/api/porto", data, () => {
    dispatch(notify("success", "Porto cadastrado com sucesso!"));
    dispatch(push("/cadastrar"));
  }, (err) => {
    dispatch(notify("error", "Erro ao cadastrar o novo porto."));
  });
};

export const postShip = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/api/embarcacao", data, () => {
    dispatch(notify("success", "Embarcação cadastrada com sucesso!"));
    dispatch(push("/cadastrar"));
  }, (err) => {
    dispatch(notify("error", "Erro ao cadastrar a nova embarcação."));
  });
};

export const postTrip = (data) => (dispatch) => {
  postData(dispatch, "http://localhost:4000/api/viagem", data, () => {
    dispatch(notify("success", "Viagem cadastrada com sucesso!"));
    dispatch(push("/cadastrar"));
  }, (err) => {
    dispatch(notify("error", "Erro ao cadastrar a nova viagem."));
  });
};

const withDetail = (message, details) => (
  message + ((details && details.detailedMessage) ? (" Mensagem: " + details.detailedMessage) : "")
);

const postData = (dispatch, url, data, onSuccess, onFailed) => {
  dispatch({type: "POST_START"});

  axios.post(url, data).then((response) => {
    dispatch({type: "POST_SUCCEEDED", response});
    if (onSuccess) onSuccess(response);
  }).catch((error) => {
    dispatch({type: "POST_FAILED", error});
    if (onFailed) onFailed(error);
  });
};

const notify = (level, message) => (
  Notifications.show({message, position: "tc", autoDismiss: 4}, level)
);
