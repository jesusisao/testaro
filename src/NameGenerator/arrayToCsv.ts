export const arrayToCsv = (arr: Array<Array<string>>): string => {
  return arr
    .map(row => row.map(str => '"' + (str ? str.replace(/"/g, '""') : '') + '"'))
    .map(row => row.join(','))
    .join('\n');
};
