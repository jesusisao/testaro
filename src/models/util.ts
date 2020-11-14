export const sleep = (msec: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, msec));

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
    .map((row) =>
      row.map((str) => '"' + (str ? str.replace(/"/g, '""') : "") + '"')
    )
    .map((row) => row.join(","))
    .join("\n");
};

export const downloadAsCsv = (data: string, name: string): void => {
  // utf8
  const bom = "\uFEFF";
  const blob = new Blob([bom, data], { type: "text/csv" });
  const anchor = document.createElement("a");

  if (window.navigator.msSaveBlob) {
    // ie
    window.navigator.msSaveBlob(blob, name);
  } else if (window.URL && anchor.download !== undefined) {
    // chrome, firefox, etc.
    anchor.download = name;
    anchor.href = window.URL.createObjectURL(blob);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.parentNode?.removeChild(anchor);
  } else {
    window.location.href =
      "data:attachment/csv;charset=utf-8," + encodeURIComponent(bom + data);
  }
};
