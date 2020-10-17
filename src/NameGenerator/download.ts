export const download = (data: string, name: string): void => {
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
