import React, { Suspense, lazy } from "react";
import { HashRouter, Route } from "react-router-dom";
import "normalize.css";
import "./App.scss";
import Loading from "./Common/Loading";
import Menu from "./Menu/Menu";
import About from "./About/About";
import RecommendedBooks from "./RecommendedBooks/RecommendedBooks";

const LazyStringGenerator = lazy(() => import("./StringGenerator/StringGenerator"));
const LazyImageGenerator = lazy(() => import("./ImageGenerator/ImageGenerator"));
const LazyPptxGenerator = lazy(() => import("./PptxGenerator/PptxGenerator"));
const LazyQrGenerator = lazy(() => import("./QrGenerator/QrGenerator"));
const LazyUserGenerator = lazy(() => import("./UserGenerator/UserGenerator"));
const LazyPdfGenerator = lazy(() => import("./PdfGenerator/PdfGenerator"));
const LazyUriDecoder = lazy(() => import("./UriDecoder/UriDecoder"));

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
            <Route exact path="/strgen" component={LazyStringGenerator} />
            <Route exact path="/uridecode" component={LazyUriDecoder} />
            <Route path="/usergen" component={LazyUserGenerator} />
            <Route path="/imggen" component={LazyImageGenerator} />
            <Route path="/pdfgen" component={LazyPdfGenerator} />
            <Route path="/pptxgen" component={LazyPptxGenerator} />
            <Route path="/qrgen" component={LazyQrGenerator} />
            <Route path="/recobooks" component={RecommendedBooks} />
          </Suspense>

          {/* 開発用 */}
          <Route path="/dev-load" component={Loading} />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
