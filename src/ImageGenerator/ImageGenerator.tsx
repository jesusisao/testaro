import React, { useState } from 'react';
import './ImageGenerator.scss';

const ImageGenerator: React.FC = () => {
  const [comment, setComment] = useState('テスト画像');
  const [charNum, setCharNum] = useState(1);

  return (
    <div className="ImageGenerator">
      <h1>テスト画像生成</h1>
      <div>
        <input type="number" onChange={ e => setCharNum( parseInt(e.target.value) ) }></input>
      </div>
      <canvas />
      <div>
        <button>画像をダウンロード</button>
      </div>
    </div>
  );
}

export default ImageGenerator;
