import moment from 'moment';

export const formatDate = (str) => moment(str).format("HH:mm, L");
export const formatDateShort = (str) => moment(str).format("L");
export const formatDateLong = (str) => moment(str).format("LLL");

export const convertLatitude = (lat) => {
  const hemisphere = lat < 0 ? "S" : "N";
  return Math.abs(lat) + "° " + hemisphere;
}

export const convertLongitude = (lng) => {
  const hemisphere = lng < 0 ? "W" : "E";
  return Math.abs(lng) + "° " + hemisphere;
}

export const extractShips = (data) => {
  const ships = {};
  Object.keys(data).forEach((key) => {
    const item = data[key];

    ships[item.embarcacao_id] = item.embarcacao;
    delete item.embarcacao;
  });
  return ships;
}

export const extractPorts = (data) => {
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

export const extractFishes = (data) => {
  const fishes = {};
  Object.keys(data).forEach((key) => {
    const trip = data[key];

    if (!trip.lances) return;

    trip.lances.forEach((lance, lanceIndex) => {
      lance.capturas.forEach((captura, capturaIndex) => {
        fishes[captura.especie_id] = captura.especie;

        delete trip.lances[lanceIndex].capturas[capturaIndex].especie;
      });
    });
  });
  return fishes;
}
