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
