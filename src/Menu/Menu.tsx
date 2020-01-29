import React from 'react';
import './Menu.scss';

const Menu: React.FC = () => {
  return (
    <div className="Menu">
      <h1>Testaro.</h1>
      <ul>
        <li>テスト文字列</li>
        <li>テストデータ</li>
        <li>テスト画像</li>
        <li>Hash</li>
        <li>バーコード</li>
      </ul>
    </div>
  );
}

export default Menu;
