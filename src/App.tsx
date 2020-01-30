import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'normalize.css';
import './App.scss';
import Menu from './Menu/Menu';
import StringGenerator from './StringGenerator/StringGenerator';
import ImageGenerator from './ImageGenerator/ImageGenerator';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu></Menu>
        <div className="App-container">
          <Route exact path='/' component={StringGenerator} />
          <Route path='/imggen' component={ImageGenerator} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
