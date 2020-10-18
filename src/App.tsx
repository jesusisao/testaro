import React, { Suspense, lazy } from "react";
import { HashRouter, Route } from "react-router-dom";
import "normalize.css";
import "./App.scss";
import Menu from "./Menu/Menu";
import About from "./About/About";
import StringGenerator from "./StringGenerator/StringGenerator";
import ImageGenerator from "./ImageGenerator/ImageGenerator";
import PptxGenerator from "./PptxGenerator/PptxGenerator";
import QrGenerator from "./QrGenerator/QrGenerator";
import Loading from "./Common/Loading";
const LazyNameGenerator = lazy(() => import("./NameGenerator/NameGenerator"));
const LazyPdfGenerator = lazy(() => import("./PdfGenerator/PdfGenerator"));

// でかいコンポーネントは遅延で読み込む。
const LazyPdfGeneratorSuspense = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyPdfGenerator />
    </Suspense>
  );
};

const LazyNameGeneratorSuspense = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyNameGenerator />
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    // BrowserRouterだとサーバーにリクエストが送られて画面更新時に404になる
    <HashRouter>
      <div className="App">
        <Menu></Menu>
        <div className="App-container">
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/strgen" component={StringGenerator} />
          <Route path="/namegen" component={LazyNameGeneratorSuspense} />
          <Route path="/imggen" component={ImageGenerator} />
          <Route path="/pdfgen" component={LazyPdfGeneratorSuspense} />
          <Route path="/pptxgen" component={PptxGenerator} />
          <Route path="/qrgen" component={QrGenerator} />

          {/* 開発用 */}
          <Route path="/dev-load" component={Loading} />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
