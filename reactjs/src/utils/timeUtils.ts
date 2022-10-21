import moment from 'moment';

export const DATE_FORMATS = {
  DEFAULT_DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  LIST_DATE_TIME_FORMAT: 'YYYY-MM-DD hh:mm A',
  TIMESTAMP_FORMAT: 'MM-DD-YY hh:mm A',
  DEFAULT_DATE_FORMAT: 'YYYY-MM-DD',
  DATE: 'YYYY-MM-DD',
  TIME: 'hh:mm:ss A',
};
export const getLocalTime = (
  time: string,
  format = DATE_FORMATS.DEFAULT_DATE_TIME_FORMAT,
  isMoment?: moment.Moment
) => {
  if (!time) {
    return time;
  }
  //utc to local
  let convertedTime = moment.utc(time).clone().local();

  //direct local
  // let convertedTime = moment(time).clone().local();
  if (!isMoment) {
    return convertedTime.format(format);
  }
  return convertedTime;
};

export const getUTCTime = (
  time: string,
  format = DATE_FORMATS.DEFAULT_DATE_TIME_FORMAT,
  isMoment?: moment.Moment
) => {
  if (!time) {
    return time;
  }
  let convertedTime = moment(time).utc();
  if (!isMoment) {
    return convertedTime.format(format);
  }
  return convertedTime;
};
