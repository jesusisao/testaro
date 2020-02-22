import React, { Suspense, lazy } from "react";
import { HashRouter, Route } from "react-router-dom";
import "normalize.css";
import "./App.scss";
import Menu from "./Menu/Menu";
import About from "./About/About";
import StringGenerator from "./StringGenerator/StringGenerator";
import NameGenerator from "./NameGenerator/NameGenerator";
import ImageGenerator from "./ImageGenerator/ImageGenerator";
import Loading from "./Common/Loading";
const LazyPdfGenerator = lazy(() => import("./PdfGenerator/PdfGenerator"));

const LazyPdfGeneratorSuspense = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyPdfGenerator />
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
          <Route path="/namegen" component={NameGenerator} />
          <Route path="/imggen" component={ImageGenerator} />
          {/* PDFはとてもでかいので遅延読み込みする必要がある。 */}
          <Route path="/pdfgen" component={LazyPdfGeneratorSuspense} />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
