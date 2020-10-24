// 各@typesはインストールされているはずなのに、
// yarn buildが突然できなくなってしまったことがあるので追加。
declare module 'react-dom';
declare module 'pdfmake/build/pdfmake';
declare module 'pdfmake/interfaces' {
    type TDocumentDefinitions = any;
}
declare module 'qrcode';
