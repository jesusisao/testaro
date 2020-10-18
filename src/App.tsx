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

const App: React.FC = () => {
  return (
    // BrowserRouterだとサーバーにリクエストが送られて画面更新時に404になる
    <HashRouter>
      <div className="App">
        <Menu></Menu>
        <div className="App-container">
          <Suspense fallback={<Loading />}>
            <Route exact path="/" component={About} />
            <Route exact path="/about" component={About} />
            <Route exact path="/strgen" component={StringGenerator} />
            <Route path="/namegen" component={LazyNameGenerator} />
            <Route path="/imggen" component={ImageGenerator} />
            <Route path="/pdfgen" component={LazyPdfGenerator} />
            <Route path="/pptxgen" component={PptxGenerator} />
            <Route path="/qrgen" component={QrGenerator} />
          </Suspense>

          {/* 開発用 */}
          <Route path="/dev-load" component={Loading} />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
