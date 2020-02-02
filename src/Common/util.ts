import moment from "moment";

export const sleep = (msec: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, msec));

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
