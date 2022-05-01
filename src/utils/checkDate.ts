import moment from 'moment';

export const checkDate = (start: Date, end: Date) => moment().isBetween(start, end);
