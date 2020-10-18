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

export const replaceVariable = (original: string, num: number): string => {
  const re = /#{.+?}/;
  const matches = original.match(re);
  if (matches === null) return original;
  const matchesNames = matches.map(str => str.slice(2).slice(0, -1));
  let copied = original.slice();
  for (const match of matchesNames) {
    if (match === "count") {
      copied = copied.replace("#{count}", num.toString());
    }
  }
  return copied;
};

export const copyToClipboard = (arg: string | number): void => {
  if (navigator.clipboard) {
    if (typeof arg === "number") {
      navigator.clipboard.writeText(arg.toString());
      return;
    }
    navigator.clipboard.writeText(arg);
  }
};

export const arrayToCsv = (arr: Array<Array<string>>): string => {
  return arr
    .map(row => row.map(str => '"' + (str ? str.replace(/"/g, '""') : '') + '"'))
    .map(row => row.join(','))
    .join('\n');
};

export const downloadAsCsv = (data: string, name: string): void => {
  // utf8
  const bom = '\uFEFF';
  const blob = new Blob([bom, data], { type: 'text/csv' });
  const anchor: any = document.createElement('a');

  if (window.navigator.msSaveBlob) {
    // ie
    window.navigator.msSaveBlob(blob, name);
  } else if (window.URL && anchor.download !== undefined) {
    // chrome, firefox, etc.
    anchor.download = name;
    anchor.href = window.URL.createObjectURL(blob);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.parentNode.removeChild(anchor);
  } else {
    window.location.href =
      'data:attachment/csv;charset=utf-8,' + encodeURIComponent(bom + data);
  }
}

// 半角数字を全角数字へ変換
export const toFullWidth = (num: number) => {
  const str = num.toString();
  return str.replace(/./g, s => {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0)
  })
}
