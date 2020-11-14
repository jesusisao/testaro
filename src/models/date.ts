import moment from "moment";

export const createRandomDate = (rangeStart: Date, rangeEnd: Date): Date => {
  const unixTimeStampStart = rangeStart.getTime();
  const unixTimeStampEnd = rangeEnd.getTime();
  const resultTimeStamp: number =
    Math.floor((unixTimeStampEnd - unixTimeStampStart) * Math.random()) +
    unixTimeStampStart;
  return new Date(resultTimeStamp);
};

export const dateToString = (date: Date): string => {
  return moment(date.getTime()).format("YYYYMMDD");
};
