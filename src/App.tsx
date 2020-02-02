import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "normalize.css";
import "./App.scss";
import Menu from "./Menu/Menu";
import StringGenerator from "./StringGenerator/StringGenerator";
import NameGenerator from "./NameGenerator/NameGenerator";
import ImageGenerator from "./ImageGenerator/ImageGenerator";

const App: React.FC = () => {
  return (
    // BrowserRouterだとサーバーにリクエストが送られて画面更新時に404になる
    <HashRouter>
      <div className="App">
        <Menu></Menu>
        <div className="App-container">
          <Route exact path="/" component={StringGenerator} />
          <Route path="/namegen" component={NameGenerator} />
          <Route path="/imggen" component={ImageGenerator} />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
