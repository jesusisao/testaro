// 各@typesはインストールされているはずなのに、
// yarn buildが突然できなくなってしまったことがあるので追加。
declare module "react-dom";
declare module "pdfmake/build/pdfmake";
declare module "pdfmake/interfaces" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type TDocumentDefinitions = any;
}
declare module "qrcode";
