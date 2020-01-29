import React, { useState } from 'react';
import './StringGenerator.scss';

const StringGenerator: React.FC = () => {
  const pattern = '○○○○○○○○○●';
  const charNum = 1000;
  const [genStr, setGenStr] = useState('');

  const generate = () => {
    const result = generateManyChars(pattern, charNum)
    setGenStr(result)
  }

  const copyToClipboard = () => {
    if(navigator.clipboard){
      navigator.clipboard.writeText(genStr);
    }
  }

  return (
    <div className="StringGenerator">
      <h1>テスト文字列生成</h1>
      <div>
        <button onClick={generate}>生成</button>
        <button onClick={copyToClipboard}>クリップボードにコピー</button>
      </div>
      <textarea className="output-area" readOnly value={genStr}></textarea>
    </div>
  );
}

// パターンと文字数を入れると、パターンを繰り返して文字数分だけ文字を生成してくれる関数
const generateManyChars = (pattern: string, charNum: number): string => {
  const patternLength = pattern.length;
  if (charNum === 0) return '';
  if (patternLength === 0) return '';
  const loopNum = Math.floor(charNum / patternLength);
  const lastAddNum = charNum % patternLength;
  let str = '';
  for (let i = 0; i < loopNum; i++) {
    str += pattern;
  }
  return str + pattern.slice(0, lastAddNum);
}

export default StringGenerator;
