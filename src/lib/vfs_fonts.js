const vfs = {
  "KosugiMaru-Regular.ttf":
};
if (
  typeof this.pdfMake !== "undefined" &&
  typeof this.pdfMake.addVirtualFileSystem !== "undefined"
) {
  this.pdfMake.addVirtualFileSystem(vfs);
}
if (typeof module !== "undefined") {
  module.exports = vfs;
}