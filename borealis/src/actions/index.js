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
  fetchData(dispatch, id, "http://localhost:4000/viagem", "trips", (data) => {
    
    //THIS IS MADNESS!
    dispatchData(dispatch, "ships", extractShips(data));
    dispatchData(dispatch, "ports", extractPorts(data));
    dispatchData(dispatch, "fishes", extractFishes(data));    
    dispatchData(dispatch, "trips", data);
  });
};

const extractShips = (data) => {
  const ships = {};
  Object.keys(data).forEach((key) => {
    const item = data[key];
    
    ships[item.embarcacao_id] = item.embarcacao;
    delete item.embarcacao;
  });
  return ships;
}

const extractPorts = (data) => {
  const ports = {};
  Object.keys(data).forEach((key) => {
    const item = data[key];
    
    ports[item.porto_chegada_id] = item.porto_chegada;
    ports[item.porto_saida_id] = item.porto_saida;
    
    delete item.porto_chegada;
    delete item.porto_saida;
  });
  return ports;
}

const extractFishes = (data) => {
  const fishes = {};
  Object.keys(data).forEach((key) => {
    const trip = data[key];
    
    trip.lances.forEach((lance, lanceIndex) => {
      lance.capturas.forEach((captura, capturaIndex) => {
        fishes[captura.especie_id] = captura.especie;
        
        delete trip.lances[lanceIndex].capturas[capturaIndex].especie;
      });
    });
  });
  return fishes;
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