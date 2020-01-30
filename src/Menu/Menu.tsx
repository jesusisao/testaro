import React from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <div className="Menu">
      <h1>Testaro.</h1>
      <ul>
        <li><Link to='/'>テスト文字列</Link></li>
        {/* <li>テストデータ</li> */}
        <li><Link to='/imggen'>テスト画像</Link></li>
        {/* <li>Hash</li> */}
        {/* <li>バーコード</li> */}
      </ul>
    </div>
  );
}

export default Menu;
