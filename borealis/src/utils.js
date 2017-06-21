import moment from 'moment';

export const formatDateShort = (str) => moment(str).format("HH:mm, L");
export const formatDateLong = (str) => moment(str).format("LLL");