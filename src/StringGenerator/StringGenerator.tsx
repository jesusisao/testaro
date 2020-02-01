import React, { useState } from 'react';
import './StringGenerator.scss';
import ParamBox from '../Common/ParamBox';

const StringGenerator: React.FC = () => {
  const [pattern, setPattern] = useState('あアｱｶﾞﾊﾟＡａAa１1亜');
  const [charNum, setCharNum] = useState(255);
  const [genStr, setGenStr] = useState('');

  const generate = () => {
    const result = generateManyChars(pattern, charNum)
    setGenStr(result)
  }

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(genStr);
    }
  }

  return (
    <div className="StringGenerator">
      <h1>テスト文字列生成</h1>
      <div>
        <ParamBox labelName="パターン">
          <select name="pattern" id="pattern" onChange={ e => setPattern(e.target.value) }>
            <option value="あアｱｶﾞﾊﾟＡａAa１1亜">あアｱｶﾞﾊﾟＡａAa１1亜</option>
            <option value="0123456789">0123456789</option>
            <option value="０１２３４５６７８９">０１２３４５６７８９</option>
            <option value="ぜんかくひらがな">ぜんかくひらがな</option>
            <option value="ゼンカクカタカナ">ゼンカクカタカナ</option>
            <option value="ﾊﾝｶｸｶﾀｶﾅﾀﾞｸﾃﾝｲﾘ">ﾊﾝｶｸｶﾀｶﾅﾀﾞｸﾃﾝｲﾘ</option>
            <option value="ABCDEFG">ABCDEFG</option>
            <option value="abcdefg">abcdefg</option>
            <option value="ＡＢＣＤＥＦＧ">ＡＢＣＤＥＦＧ</option>
            <option value="ａｂｃｄｅｆｇ">ａｂｃｄｅｆｇ</option>
            <option value="亜唖娃阿哀愛挨姶逢葵">亜唖娃阿哀愛挨姶逢葵</option>
            <option value="XXXXXXXXX*">XXXXXXXXX*</option>
            <option value="○○○○○○○○○●">○○○○○○○○○●</option>
            {/* <option value="🤔😂😊😭😇💪👊✋🙏👏">よく使う絵文字</option> */}
          </select>
        </ParamBox>
        <ParamBox labelName="文字数">
          <input type="number" defaultValue={charNum} onChange={ e => setCharNum( parseInt(e.target.value) ) }></input>
        </ParamBox>
        <button onClick={generate}>生成</button>
      </div>
      <textarea className="output-area" readOnly value={genStr}></textarea>
      <div>
        <button onClick={copyToClipboard}>クリップボードにコピー</button>
      </div>
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
