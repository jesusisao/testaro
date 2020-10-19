import React, { useState } from "react";
import "./StringGenerator.scss";
import "../Common/common.scss";
import { copyToClipboard } from "../Common/util";
import ParamBox from "../Common/ParamBox";

// パターンと文字数を入れると、パターンを繰り返して文字数分だけ文字を生成してくれる関数
export const generateManyChars = (pattern: string, charNum: number): string => {
  const patternLength = pattern.length;
  if (charNum === 0) return "";
  if (patternLength === 0) return "";
  const loopNum = Math.floor(charNum / patternLength);
  const lastAddNum = charNum % patternLength;
  let str = "";
  for (let i = 0; i < loopNum; i++) {
    str += pattern;
  }
  return str + pattern.slice(0, lastAddNum);
};

const StringGenerator: React.FC = () => {
  const [pattern, setPattern] = useState("あアｱｶﾞﾊﾟＡａAa１1亜");
  const [charNum, setCharNum] = useState(128);
  const [genStr, setGenStr] = useState("");

  const generate = (): void => {
    const result = generateManyChars(pattern, charNum);
    setGenStr(result);
  };

  return (
    <div className="StringGenerator">
      <h1 className="page-title">テスト文字列生成</h1>
      <div className="params-container">
        <div className="param-container">
          <ParamBox labelName="パターン">
            <select
              name="pattern"
              id="pattern"
              onChange={(e): void => setPattern(e.target.value)}
            >
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
            <input
              className="text-right"
              type="number"
              list="charNum"
              defaultValue={charNum}
              onChange={(e): void => setCharNum(parseInt(e.target.value))}
            ></input>
            <datalist id="charNum">
              <option value={255} />
              <option value={256} />
              {/* IEのGETとPOSTで使えるURLの最大長 */}
              <option value={2048} />
              <option value={2049} />
              {/* IEで使えるURLの最大長 */}
              <option value={2083} />
              <option value={2084} />
              <option value={65535} />
              <option value={65536} />
            </datalist>
          </ParamBox>

          <button className="testaro-button" onClick={generate}>
            生成
          </button>

        </div>
      </div>
      <div className="outputs-container">
        <div className="output-container">
          <textarea className="output-area" readOnly value={genStr}></textarea>
          <div>
            <button
              className="testaro-button"
              onClick={(): void => copyToClipboard(genStr)}
            >
              クリップボードにコピー
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringGenerator;
