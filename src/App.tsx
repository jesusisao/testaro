import React from 'react';
import 'normalize.css';
import './App.scss';
import Menu from './Menu/Menu'
import StringGenerator from './StringGenerator/StringGenerator'

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu></Menu>
      <div className="App-container">
        <StringGenerator />
      </div>
    </div>
  );
}

export default App;
